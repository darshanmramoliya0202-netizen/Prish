export type ProductSpec = {
  name: string;
  category: string;
  moisture: string;
  ash: string;
  mesh: string;
  shelfLife: string;
  color: string;
  shu?: string;
  curcumin?: string;
  packaging: string[];
};

export const productSpecs: ProductSpec[] = [
  {
    name: "Jamun Powder",
    category: "Botanical Powders",
    moisture: "≤ 8%",
    ash: "≤ 5%",
    mesh: "60–100 mesh",
    shelfLife: "12–18 months",
    color: "Deep purple-black",
    packaging: ["25 kg HDPE bag", "Fiber drum", "Custom packs"]
  },
  {
    name: "Beetroot Powder",
    category: "Botanical Powders",
    moisture: "≤ 7%",
    ash: "≤ 6%",
    mesh: "80–100 mesh",
    shelfLife: "12–24 months",
    color: "Deep crimson-red",
    packaging: ["25 kg HDPE bag", "Fiber drum", "Bulk box"]
  },
  {
    name: "Turmeric Powder",
    category: "Botanical Powders",
    moisture: "≤ 10%",
    ash: "≤ 8%",
    mesh: "60–100 mesh",
    shelfLife: "18–24 months",
    color: "Bright golden-yellow",
    curcumin: "2–5% (customizable)",
    packaging: ["25 kg HDPE bag", "BOPP bag", "Fiber drum"]
  },
  {
    name: "Sea Buckthorn Powder",
    category: "Botanical Powders",
    moisture: "≤ 6%",
    ash: "≤ 4%",
    mesh: "80–120 mesh",
    shelfLife: "12–18 months",
    color: "Vibrant orange",
    packaging: ["10 kg packs", "25 kg HDPE bag", "Custom"]
  },
  {
    name: "Dehydrated Onion Powder",
    category: "Dehydrated Ingredients",
    moisture: "≤ 6%",
    ash: "≤ 5%",
    mesh: "40–100 mesh",
    shelfLife: "12–18 months",
    color: "Creamy white to light yellow",
    packaging: ["25 kg HDPE bag", "Fiber drum", "Bulk box"]
  },
  {
    name: "Dehydrated Garlic Powder",
    category: "Dehydrated Ingredients",
    moisture: "≤ 6%",
    ash: "≤ 5%",
    mesh: "60–100 mesh",
    shelfLife: "12–18 months",
    color: "Off-white to cream",
    packaging: ["25 kg HDPE bag", "Fiber drum", "Bulk box"]
  },
  {
    name: "Red Chili Powder",
    category: "Indian Raw Spices",
    moisture: "≤ 10%",
    ash: "≤ 8%",
    mesh: "40–80 mesh",
    shelfLife: "12–24 months",
    color: "Bright red",
    shu: "15,000–50,000 SHU",
    packaging: ["25 kg HDPE bag", "BOPP bag", "Bulk"]
  },
  {
    name: "Ginger Powder",
    category: "Botanical Powders",
    moisture: "≤ 10%",
    ash: "≤ 7%",
    mesh: "60–100 mesh",
    shelfLife: "18–24 months",
    color: "Light yellow-brown",
    packaging: ["25 kg HDPE bag", "Fiber drum", "Custom"]
  }
];
