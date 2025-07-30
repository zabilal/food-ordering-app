import sequelize from '../src/config/database';
import Food from '../src/models/food.model';

const dummyFoods = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60',
    category: 'pizza',
    rating: 4.5,
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and pepperoni',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60',
    category: 'pizza',
    rating: 4.7,
  },
  {
    name: 'Chicken Burger',
    description: 'Juicy chicken patty with lettuce, tomato, and special sauce',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    category: 'burger',
    rating: 4.3,
  },
  {
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheddar cheese, lettuce, tomato, and special sauce',
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    category: 'burger',
    rating: 4.6,
  },
  {
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber roll with sesame seeds',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60',
    category: 'sushi',
    rating: 4.4,
  },
  {
    name: 'Spicy Tuna Roll',
    description: 'Spicy tuna and cucumber roll with spicy mayo',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60',
    category: 'sushi',
    rating: 4.7,
  },
];

async function seedDatabase() {
  try {
    // Sync all models
    await sequelize.sync({ force: true });
    
    console.log('Database synced!');
    
    // Create dummy foods
    const createdFoods = await Food.bulkCreate(dummyFoods);
    
    console.log(`Successfully created ${createdFoods.length} food items!`);
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
