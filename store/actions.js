import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import RazorpayCheckout from 'react-native-razorpay';
import { BODY_PARTS } from './util';

/* ---------------- MOCK DATA GENERATOR ---------------- */

export const generateMockMedicines = (part, page = 1, limit = 6) => {
  const baseMedicines = {
    bones: [
      {
        name: 'Calcium Citrate',
        description: 'Supports bone health and prevents osteoporosis.',
      },
      {
        name: 'Vitamin D3',
        description: 'Essential for calcium absorption and bone strength.',
      },
      {
        name: 'Glucosamine Sulfate',
        description: 'Helps maintain joint cartilage and reduces pain.',
      },
      {
        name: 'Ibuprofen',
        description: 'Anti-inflammatory for joint pain and swelling.',
      },
      {
        name: 'Alendronate',
        description: 'Treats osteoporosis by increasing bone density.',
      },
      {
        name: 'Chondroitin',
        description: 'Supports joint health and flexibility.',
      },
      { name: 'Risedronate', description: 'Prevents and treats osteoporosis.' },
      {
        name: 'Teriparatide',
        description: 'Stimulates bone formation in severe osteoporosis.',
      },
    ],
    heart: [
      {
        name: 'Aspirin',
        description: 'Reduces risk of heart attack and stroke.',
      },
      {
        name: 'Atorvastatin',
        description: 'Lowers cholesterol levels to prevent heart disease.',
      },
      {
        name: 'Lisinopril',
        description: 'ACE inhibitor for high blood pressure.',
      },
      {
        name: 'Metoprolol',
        description: 'Beta-blocker for heart rhythm and blood pressure.',
      },
      {
        name: 'Warfarin',
        description: 'Anticoagulant to prevent blood clots.',
      },
      {
        name: 'Clopidogrel',
        description: 'Antiplatelet medication for heart attack prevention.',
      },
      {
        name: 'Digoxin',
        description: 'Treats heart failure and irregular heartbeat.',
      },
      {
        name: 'Furosemide',
        description: 'Diuretic for heart failure and edema.',
      },
    ],
    hair: [
      {
        name: 'Minoxidil',
        description: 'Promotes hair growth in male pattern baldness.',
      },
      {
        name: 'Finasteride',
        description: 'Reduces DHT levels to prevent hair loss.',
      },
      {
        name: 'Biotin',
        description: 'Vitamin supplement for hair strength and growth.',
      },
      {
        name: 'Ketoconazole',
        description: 'Antifungal shampoo for scalp health.',
      },
      {
        name: 'Spironolactone',
        description: 'Blocks androgens that cause hair loss.',
      },
      {
        name: 'Caffeine Shampoo',
        description: 'Stimulates hair follicles for growth.',
      },
      {
        name: 'Saw Palmetto',
        description: 'Natural DHT blocker for hair loss.',
      },
      { name: 'Vitamin D', description: 'Essential for hair follicle health.' },
    ],
    eyes: [
      {
        name: 'Artificial Tears',
        description: 'Lubricates dry eyes and provides relief.',
      },
      {
        name: 'Timolol',
        description: 'Reduces intraocular pressure in glaucoma.',
      },
      {
        name: 'Latanoprost',
        description: 'Prostaglandin analog for glaucoma treatment.',
      },
      {
        name: 'Prednisolone',
        description: 'Steroid eye drops for inflammation.',
      },
      {
        name: 'Ciprofloxacin',
        description: 'Antibiotic eye drops for infections.',
      },
      {
        name: 'Dorzolamide',
        description: 'Carbonic anhydrase inhibitor for glaucoma.',
      },
      { name: 'Brimonidine', description: 'Reduces eye pressure in glaucoma.' },
      {
        name: 'Cyclosporine',
        description: 'Immunomodulator for dry eye syndrome.',
      },
    ],
    liver: [
      {
        name: 'Ursodiol',
        description: 'Dissolves gallstones and treats liver diseases.',
      },
      {
        name: 'Silymarin',
        description: 'Milk thistle extract for liver protection.',
      },
      {
        name: 'Acetaminophen',
        description: 'Pain reliever, but monitor liver function.',
      },
      {
        name: 'Prednisone',
        description: 'Steroid for autoimmune liver diseases.',
      },
      { name: 'Rifampin', description: 'Antibiotic for liver infections.' },
      {
        name: 'Methotrexate',
        description: 'Immunosuppressant for liver conditions.',
      },
      {
        name: 'Colchicine',
        description: 'Treats amyloidosis affecting the liver.',
      },
      {
        name: 'Penicillamine',
        description: "Chelates copper in Wilson's disease.",
      },
    ],
    skin: [
      {
        name: 'Hydrocortisone',
        description: 'Topical steroid for skin inflammation.',
      },
      {
        name: 'Benzoyl Peroxide',
        description: 'Treats acne by killing bacteria.',
      },
      {
        name: 'Retin-A',
        description: 'Vitamin A derivative for acne and wrinkles.',
      },
      {
        name: 'Clotrimazole',
        description: 'Antifungal cream for skin infections.',
      },
      {
        name: 'Calamine Lotion',
        description: 'Soothes itching and irritation.',
      },
      { name: 'Doxycycline', description: 'Antibiotic for severe acne.' },
      { name: 'Isotretinoin', description: 'Powerful acne medication.' },
      { name: 'Tacrolimus', description: 'Immunomodulator for eczema.' },
    ],
    kidney: [
      {
        name: 'Furosemide',
        description: 'Diuretic for fluid retention in kidney disease.',
      },
      {
        name: 'Lisinopril',
        description: 'ACE inhibitor for kidney protection.',
      },
      {
        name: 'Epoetin Alfa',
        description: 'Stimulates red blood cell production.',
      },
      { name: 'Calcitriol', description: 'Active vitamin D for bone health.' },
      {
        name: 'Phosphate Binders',
        description: 'Controls phosphorus levels in kidney disease.',
      },
      {
        name: 'Sevelamer',
        description: 'Phosphate binder for dialysis patients.',
      },
      {
        name: 'Cinacalcet',
        description: 'Treats high calcium in parathyroid glands.',
      },
      {
        name: 'Iron Supplements',
        description: 'Treats anemia in chronic kidney disease.',
      },
    ],
  };

  const medicines = baseMedicines[part] || [];
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMedicines = medicines.slice(startIndex, endIndex);

  return {
    medicines: paginatedMedicines.map((med, index) => ({
      id: startIndex + index + 1,
      name: med.name,
      description: med.description,
    })),
    totalPages: Math.ceil(medicines.length / limit),
    currentPage: page,
  };
};

/* ---------------- FETCH PRODUCTS ---------------- */

function buildSearchQuery(part) {
  const keywords = BODY_PARTS[part];

  if (!keywords) return '';

  return keywords.map(k => `indications_and_usage:${k}`).join(' OR ');
}

function normalizeDrug(drug) {
  return {
    id: drug.id,
    description: drug.description?.[0] || 'No description available.',
    brandName: drug.openfda?.brand_name?.[0] || 'Unknown',
    genericName: drug.openfda?.generic_name?.[0] || '',
    manufacturer: drug.openfda?.manufacturer_name?.[0] || '',
    purpose: drug.indications_and_usage?.[0] || '',
  };
}

export const fetchByBodyPartData = createAsyncThunk(
  'data/fetchByBodyPartData',
  async ({ part, limit = 9 }) => {
    const searchQuery = buildSearchQuery(part);
    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(
        searchQuery,
      )}`,
    );
    return response.data.results
      .map(normalizeDrug)
      .filter(item => item.brandName !== 'Unknown');
  },
);

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ part, page = 1, limit = 9 }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockMedicines(part, page, limit);
  },
);

/* ---------------- CREATE ORDER ---------------- */

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ amount }, thunkAPI) => {
    try {
      const response = await fetch('http://YOUR_IP:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* ---------------- START PAYMENT ---------------- */

export const startPayment = createAsyncThunk(
  'payment/startPayment',
  async (item, thunkAPI) => {
    try {
      // 🔹 USE createOrder HERE
      const order = await thunkAPI
        .dispatch(createOrder({ amount: item.price }))
        .unwrap();

      // 🔹 Open Razorpay
      const paymentData = await RazorpayCheckout.open({
        key: 'rzp_test_xxxxxxxx',
        amount: order.amount,
        currency: order.currency,
        name: 'My Store',
        description: item.title,
        order_id: order.id,
        theme: { color: '#53a20e' },
      });

      // 🔹 Verify payment
      const verifyResponse = await fetch('http://YOUR_IP:5000/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const verification = await verifyResponse.json();

      if (!verification.success) {
        throw new Error('Payment verification failed');
      }

      return paymentData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
