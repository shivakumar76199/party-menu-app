// src/data/mockDishes.js
export const dishes = [
    {
      id: 1,
      name: "Kadhai Paneer",
      description: "Paneer cubes in spicy onion gravy with capsicum.",
      image: "https://placehold.co/420x280/F7D0B3/422402?text=Kadhai+Paneer",
      mealType: "MAIN COURSE",
      type: "VEG",
      price: 240,
      rating: 4.5,
      prepTime: "25 min",
      ingredients: [
        { name: "Paneer", quantity: "200g" },
        { name: "Onion", quantity: "2 large" },
        { name: "Capsicum", quantity: "1" },
        { name: "Tomato Puree", quantity: "1 cup" }
      ]
    },
    {
      id: 2,
      name: "Veg Spring Rolls",
      description: "Crispy rolls stuffed with mixed vegetables and served with sauce.",
      image: "https://placehold.co/420x280/DAE8A7/2F4F2F?text=Spring+Rolls",
      mealType: "STARTER",
      type: "VEG",
      price: 120,
      rating: 4.2,
      prepTime: "15 min",
      ingredients: [
        { name: "Cabbage", quantity: "100g" },
        { name: "Carrot", quantity: "1" },
        { name: "Spring Roll Sheet", quantity: "6" }
      ]
    },
    {
      id: 3,
      name: "Butter Chicken",
      description: "Tender chicken in a creamy tomato-based sauce.",
      image: "https://placehold.co/420x280/F3C6C6/422402?text=Butter+Chicken",
      mealType: "MAIN COURSE",
      type: "NON-VEG",
      price: 320,
      rating: 4.7,
      prepTime: "30 min",
      ingredients: [
        { name: "Chicken", quantity: "400g" },
        { name: "Butter", quantity: "50g" },
        { name: "Cream", quantity: "1/2 cup" }
      ]
    },
    {
      id: 4,
      name: "Gulab Jamun",
      description: "Soft milk-solid balls soaked in saffron-scented sugar syrup.",
      image: "https://placehold.co/420x280/FDEBD0/422402?text=Gulab+Jamun",
      mealType: "DESSERT",
      type: "VEG",
      price: 90,
      rating: 4.6,
      prepTime: "10 min",
      ingredients: [
        { name: "Milk Powder", quantity: "1 cup" },
        { name: "Sugar Syrup", quantity: "1 cup" }
      ]
    },
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden potato fries with seasoning.",
      image: "https://placehold.co/420x280/E8E8E8/222222?text=Fries",
      mealType: "SIDES",
      type: "VEG",
      price: 110,
      rating: 4.1,
      prepTime: "12 min",
      ingredients: [
        { name: "Potato", quantity: "3 medium" },
        { name: "Salt", quantity: "to taste" }
      ]
    },
    {
      id: 6,
      name: "Prawn Tempura",
      description: "Lightly battered prawns fried to a crisp.",
      image: "https://placehold.co/420x280/CDE7F0/002F4F?text=Prawn+Tempura",
      mealType: "STARTER",
      type: "NON-VEG",
      price: 380,
      rating: 4.4,
      prepTime: "20 min",
      ingredients: [
        { name: "Prawns", quantity: "250g" },
        { name: "Tempura Batter", quantity: "1 cup" }
      ]
    }
  ];
  