// type RoomType = {
//   name: string;
//   basePrice: number;
//   numberOfSub: number;
//   subType: {
//     name: string;
//     price: number;
//     id: number;
//     attributes: string[];
//   }[];
// };

// const roomType: RoomType = [
//   {
//     name: "single sharing",
//     basePrice: 10000.0,
//     numberOfSub: 4,
//     subType: [
//       {
//         name: "single Sharing Ac balcony",
//         price: 13000,
//         id: 1,
//         attributes: ["AC", "Balcony"],
//       },
//       {
//         name: "single Sharing non-Ac",
//         price: 10000,
//         id: 2,
//         attributes: ["Non-AC"],
//       },
//       {
//         name: "single Sharing Ac",
//         price: 12000,
//         id: 3,
//         attributes: ["AC"],
//       },
//       {
//         name: "single Sharing non-Ac balcony",
//         price: 11000,
//         id: 4,
//         attributes: ["Balcony"],
//       },
//     ],
//   },
//   {
//     name: "double sharing",
//     basePrice: 18000.0,
//     numberOfSub: 3,
//     subType: [
//       {
//         name: "double Sharing non-Ac",
//         price: 15000,
//         id: 5,
//         attributes: ["Non-AC"],
//       },
//       {
//         name: "double Sharing Ac balcony",
//         price: 20000,
//         id: 6,
//         attributes: ["AC", "Balcony"],
//       },
//       {
//         name: "double Sharing Ac",
//         price: 18000,
//         id: 7,
//         attributes: ["AC"],
//       },
//     ],
//   },
//   {
//     name: "triple sharing",
//     basePrice: 25000.0,
//     numberOfSub: 2,
//     subType: [
//       {
//         name: "triple Sharing Ac balcony",
//         price: 30000,
//         id: 8,
//         attributes: ["AC", "Balcony"],
//       },
//       {
//         name: "triple Sharing Ac",
//         price: 28000,
//         id: 9,
//         attributes: ["AC"],
//       },
//     ],
//   },
//   {
//     name: "deluxe",
//     basePrice: 35000.0,
//     numberOfSub: 1,
//     subType: [
//       {
//         name: "deluxe room",
//         price: 35000,
//         id: 10,
//         attributes: ["AC", "Balcony", "Bathtub", "Seating area"],
//       },
//     ],
//   },
//   {
//     name: "suite",
//     basePrice: 45000.0,
//     numberOfSub: 1,
//     subType: [
//       {
//         name: "luxury suite",
//         price: 45000,
//         id: 11,
//         attributes: ["AC", "Balcony", "Bathtub", "Living room"],
//       },
//     ],
//   },
// ];

// const roomTypes = [
//   {
//     roomTypeName: "Single Sharing",
//     noOfSubs: 1,
//     basePrice: "10000.00",
//     subRoomTypes: [
//       {
//         id: "901",
//         roomTypeName: "Single Sharing",
//         attributes: [],
//         price: "10000.00",
//         hostels: [
//           {
//             id: "123",
//             hostelName: "Onboarding Hostel",
//             blocks: [
//               {
//                 id: "782",
//                 blockName: "Onboarding Block",
//                 floors: [
//                   {
//                     id: "1929",
//                     floorName: "Onboarding Floor",
//                     rooms: [
//                       {
//                         id: "2799936",
//                         roomName: "Onboarding Room 102",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                     ],
//                   },
//                   {
//                     id: "1930",
//                     floorName: "Onboarding Floor 2",
//                     rooms: [
//                       {
//                         id: "2799941",
//                         roomName: "Onboarding Room 203",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                       {
//                         id: "2799942",
//                         roomName: "Onboarding Room 204",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: "456",
//             hostelName: "Tech Hostel",
//             blocks: [
//               {
//                 id: "678",
//                 blockName: "Tech Block",
//                 floors: [
//                   {
//                     id: "777",
//                     floorName: "Tech Floor",
//                     rooms: [
//                       {
//                         id: "2799943",
//                         roomName: "Tech Room 101",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                       {
//                         id: "2799944",
//                         roomName: "Tech Room 102",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                     ],
//                   },
//                   {
//                     id: "778",
//                     floorName: "Tech Floor 2",
//                     rooms: [
//                       {
//                         id: "2799945",
//                         roomName: "Tech Room 201",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                       {
//                         id: "2799946",
//                         roomName: "Tech Room 202",
//                         totalOccupancy: "1",
//                         availability: "1",
//                         roomTypeId: "901",
//                         roomType: "Single Sharing",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
// export default roomTypes;
