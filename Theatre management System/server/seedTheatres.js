const Theatre = require("./models/Theatre");

const shows = [
  { time: "10:00 AM" },
  { time: "1:30 PM" },
  { time: "5:00 PM" },
  { time: "9:00 PM" }
];

const theatresData = [

  // Chennai
  { name: "PVR Velachery", location: "Chennai", shows },
  { name: "AGS Cinemas OMR", location: "Chennai", shows },
  { name: "INOX Marina Mall", location: "Chennai", shows },
  { name: "Rohini Silver Screens", location: "Chennai", shows },
  { name: "Sathyam Cinemas", location: "Chennai", shows },
  { name: "Escape Cinemas", location: "Chennai", shows },
  { name: "SPI Palazzo", location: "Chennai", shows },
  { name: "Mayajaal Multiplex", location: "Chennai", shows },
  { name: "Devi Cineplex", location: "Chennai", shows },
  { name: "Albert Theatre", location: "Chennai", shows },

  // Bangalore
  { name: "PVR Orion Mall", location: "Bangalore", shows },
  { name: "INOX Garuda Mall", location: "Bangalore", shows },
  { name: "Cinepolis Bannerghatta", location: "Bangalore", shows },
  { name: "Gopalan Cinemas", location: "Bangalore", shows },
  { name: "Urvashi Theatre", location: "Bangalore", shows },
  { name: "Navrang Theatre", location: "Bangalore", shows },
  { name: "Innovative Multiplex", location: "Bangalore", shows },
  { name: "PVR Forum Mall", location: "Bangalore", shows },
  { name: "Sri Radhakrishna Theatre", location: "Bangalore", shows },
  { name: "Vaibhav Theatre", location: "Bangalore", shows },

  // Mumbai
  { name: "PVR Phoenix Mall", location: "Mumbai", shows },
  { name: "INOX Nariman Point", location: "Mumbai", shows },
  { name: "Cinepolis Andheri", location: "Mumbai", shows },
  { name: "Carnival Cinemas", location: "Mumbai", shows },
  { name: "Regal Cinema", location: "Mumbai", shows },
  { name: "Metro INOX", location: "Mumbai", shows },
  { name: "Gaiety Galaxy", location: "Mumbai", shows },
  { name: "PVR Juhu", location: "Mumbai", shows },
  { name: "Movietime Goregaon", location: "Mumbai", shows },
  { name: "Fun Cinemas", location: "Mumbai", shows },

  // Delhi
  { name: "PVR Select City Walk", location: "Delhi", shows },
  { name: "INOX Nehru Place", location: "Delhi", shows },
  { name: "Cinepolis Saket", location: "Delhi", shows },
  { name: "Carnival Cinemas", location: "Delhi", shows },
  { name: "Delite Cinema", location: "Delhi", shows },
  { name: "Liberty Cinema", location: "Delhi", shows },
  { name: "Movie Time Rajouri", location: "Delhi", shows },
  { name: "Satyam Cineplex", location: "Delhi", shows },
  { name: "PVR Vikaspuri", location: "Delhi", shows },
  { name: "DT Cinemas", location: "Delhi", shows },

  // Hyderabad
  { name: "PVR Next Galleria", location: "Hyderabad", shows },
  { name: "INOX GVK One", location: "Hyderabad", shows },
  { name: "AMB Cinemas", location: "Hyderabad", shows },
  { name: "Prasads Multiplex", location: "Hyderabad", shows },
  { name: "Asian Cinemas", location: "Hyderabad", shows },
  { name: "Carnival Cinemas", location: "Hyderabad", shows },
  { name: "Sudarshan Theatre", location: "Hyderabad", shows },
  { name: "Sandhya Theatre", location: "Hyderabad", shows },
  { name: "Sri Rama Theatre", location: "Hyderabad", shows },
  { name: "PVR Forum Mall", location: "Hyderabad", shows },

  // Kolkata
  { name: "PVR Diamond Plaza", location: "Kolkata", shows },
  { name: "INOX South City Mall", location: "Kolkata", shows },
  { name: "Cinepolis Acropolis", location: "Kolkata", shows },
  { name: "Carnival Cinemas", location: "Kolkata", shows },
  { name: "Priya Cinema", location: "Kolkata", shows },
  { name: "Navina Cinema", location: "Kolkata", shows },
  { name: "Star Theatre", location: "Kolkata", shows },
  { name: "Menoka Cinema", location: "Kolkata", shows },
  { name: "PVR Avani Mall", location: "Kolkata", shows },
  { name: "INOX City Centre", location: "Kolkata", shows },

  // Pune
  { name: "PVR Phoenix Marketcity", location: "Pune", shows },
  { name: "INOX Bund Garden", location: "Pune", shows },
  { name: "Cinepolis Seasons Mall", location: "Pune", shows },
  { name: "Carnival Cinemas", location: "Pune", shows },
  { name: "City Pride Kothrud", location: "Pune", shows },
  { name: "E-Square Multiplex", location: "Pune", shows },
  { name: "Victory Theatre", location: "Pune", shows },
  { name: "PVR Pavilion Mall", location: "Pune", shows },
  { name: "Mangala Theatre", location: "Pune", shows },
  { name: "Rahul Theatre", location: "Pune", shows },

  // Ahmedabad
  { name: "PVR Acropolis Mall", location: "Ahmedabad", shows },
  { name: "INOX Himalaya Mall", location: "Ahmedabad", shows },
  { name: "Cinepolis Alpha One", location: "Ahmedabad", shows },
  { name: "Carnival Cinemas", location: "Ahmedabad", shows },
  { name: "City Gold Cinema", location: "Ahmedabad", shows },
  { name: "Wide Angle Cinema", location: "Ahmedabad", shows },
  { name: "PVR Arved Transcube", location: "Ahmedabad", shows },
  { name: "Drive In Cinema", location: "Ahmedabad", shows },
  { name: "Rajhans Cinema", location: "Ahmedabad", shows },
  { name: "Miraj Cinemas", location: "Ahmedabad", shows },

  // Coimbatore
  { name: "KG Cinemas", location: "Coimbatore", shows },
  { name: "Brookefields Cinemas", location: "Coimbatore", shows },
  { name: "Fun Republic Mall", location: "Coimbatore", shows },
  { name: "Carnival Cinemas", location: "Coimbatore", shows },
  { name: "Sree Devi Cineplex", location: "Coimbatore", shows },
  { name: "Senthil Kumaran Theatre", location: "Coimbatore", shows },
  { name: "Archana Theatre", location: "Coimbatore", shows },
  { name: "Central Theatre", location: "Coimbatore", shows },
  { name: "Shanthi Theatre", location: "Coimbatore", shows },
  { name: "Karpagam Cinemas", location: "Coimbatore", shows },

  // Madurai
  { name: "INOX Vishaal Mall", location: "Madurai", shows },
  { name: "PVR Cinemas", location: "Madurai", shows },
  { name: "Guru Cinemas", location: "Madurai", shows },
  { name: "Ambiga Theatre", location: "Madurai", shows },
  { name: "Thangam Cinemas", location: "Madurai", shows },
  { name: "Mini Priya Theatre", location: "Madurai", shows },
  { name: "Sugapriya Theatre", location: "Madurai", shows },
  { name: "Mathi Theatre", location: "Madurai", shows },
  { name: "Sri Meenakshi Theatre", location: "Madurai", shows },
  { name: "Sakthi Cinemas", location: "Madurai", shows },

  // Salem
  { name: "ARRS Multiplex", location: "Salem", shows },
  { name: "INOX Salem", location: "Salem", shows },
  { name: "Sangeeth Theatre", location: "Salem", shows },
  { name: "Kailash Theatre", location: "Salem", shows },
  { name: "KS Theatre", location: "Salem", shows },
  { name: "Sri Raja Sabari Theatre", location: "Salem", shows },
  { name: "Big Cinemas", location: "Salem", shows },
  { name: "Modern Theatre", location: "Salem", shows },
  { name: "Divya Theatre", location: "Salem", shows },
  { name: "Gowri Theatre", location: "Salem", shows },

  // Tirunelveli
  { name: "Ram Cinemas", location: "Tirunelveli", shows },
  { name: "PSS Multiplex", location: "Tirunelveli", shows },
  { name: "Sri Rathna Theatre", location: "Tirunelveli", shows },
  { name: "Central Theatre", location: "Tirunelveli", shows },
  { name: "Ganesh Theatre", location: "Tirunelveli", shows },
  { name: "Ramakrishna Theatre", location: "Tirunelveli", shows },
  { name: "Sivasakthi Theatre", location: "Tirunelveli", shows },
  { name: "Alankar Theatre", location: "Tirunelveli", shows },
  { name: "Lakshmi Theatre", location: "Tirunelveli", shows },
  { name: "Sri Balaji Theatre", location: "Tirunelveli", shows },

  // Erode
  { name: "Vetri Theatre", location: "Erode", shows },
  { name: "Abirami Theatre", location: "Erode", shows },
  { name: "Sri Krishna Theatre", location: "Erode", shows },
  { name: "Royal Theatre", location: "Erode", shows },
  { name: "Anna Theatre", location: "Erode", shows },
  { name: "Chandra Theatre", location: "Erode", shows },
  { name: "Sangeetha Theatre", location: "Erode", shows },
  { name: "Sri Venkatesa Theatre", location: "Erode", shows },
  { name: "Devi Theatre", location: "Erode", shows },
  { name: "Murugan Theatre", location: "Erode", shows },

  // Trichy
  { name: "LA Cinemas", location: "Trichy", shows },
  { name: "INOX Manghalam Towers", location: "Trichy", shows },
  { name: "Ramba Theatre", location: "Trichy", shows },
  { name: "Kalaiarangam Theatre", location: "Trichy", shows },
  { name: "Sona Mina Theatre", location: "Trichy", shows },
  { name: "Cauvery Theatre", location: "Trichy", shows },
  { name: "Aruna Theatre", location: "Trichy", shows },
  { name: "Sri Renga Theatre", location: "Trichy", shows },
  { name: "Vijay Cinemas", location: "Trichy", shows },
  { name: "Mariyam Theatre", location: "Trichy", shows },

  // Vellore
  { name: "PVR Velocity Mall", location: "Vellore", shows },
  { name: "Apsara Theatre", location: "Vellore", shows },
  { name: "Lakshmi Theatre", location: "Vellore", shows },
  { name: "Sri Balaji Theatre", location: "Vellore", shows },
  { name: "Siva Cinemas", location: "Vellore", shows },
  { name: "Alankar Theatre", location: "Vellore", shows },
  { name: "Vetri Theatre", location: "Vellore", shows },
  { name: "Raja Theatre", location: "Vellore", shows },
  { name: "Anna Theatre", location: "Vellore", shows },
  { name: "Ganesh Theatre", location: "Vellore", shows },

  // Thoothukudi
  { name: "PVR Cinemas", location: "Thoothukudi", shows },
  { name: "Sri Balakrishna Theatre", location: "Thoothukudi", shows },
  { name: "Raj Theatre", location: "Thoothukudi", shows },
  { name: "Ganesh Theatre", location: "Thoothukudi", shows },
  { name: "Sivaji Theatre", location: "Thoothukudi", shows },
  { name: "New Cleopatra Theatre", location: "Thoothukudi", shows },
  { name: "Kasi Theatre", location: "Thoothukudi", shows },
  { name: "Chitra Theatre", location: "Thoothukudi", shows },
  { name: "Vetri Theatre", location: "Thoothukudi", shows },
  { name: "Raja Theatre", location: "Thoothukudi", shows },

  // Dindigul
  { name: "Aarthi Theatre", location: "Dindigul", shows },
  { name: "Rajendra Theatre", location: "Dindigul", shows },
  { name: "Natraj Theatre", location: "Dindigul", shows },
  { name: "Ganesh Theatre", location: "Dindigul", shows },
  { name: "Central Theatre", location: "Dindigul", shows },
  { name: "Sakthi Theatre", location: "Dindigul", shows },
  { name: "Devi Theatre", location: "Dindigul", shows },
  { name: "Vetri Theatre", location: "Dindigul", shows },
  { name: "Anna Theatre", location: "Dindigul", shows },
  { name: "Raja Theatre", location: "Dindigul", shows },

  // Kanchipuram
  { name: "Babu Theatre", location: "Kanchipuram", shows },
  { name: "Aruna Theatre", location: "Kanchipuram", shows },
  { name: "Sri Balaji Theatre", location: "Kanchipuram", shows },
  { name: "Siva Theatre", location: "Kanchipuram", shows },
  { name: "Ganesh Theatre", location: "Kanchipuram", shows },
  { name: "Anna Theatre", location: "Kanchipuram", shows },
  { name: "Devi Theatre", location: "Kanchipuram", shows },
  { name: "Raja Theatre", location: "Kanchipuram", shows },
  { name: "Vetri Theatre", location: "Kanchipuram", shows },
  { name: "Murugan Theatre", location: "Kanchipuram", shows }

];
const seedTheatres = async () => {
  try {
    const count = await Theatre.countDocuments();

    if (count > 0) {
      console.log("Already seeded ✅");
      return;
    }

    await Theatre.insertMany(theatresData);
    console.log("🔥 All locations theatres inserted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedTheatres;