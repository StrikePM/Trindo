/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('products').del()
  await knex('products').insert([
    {
      product_id: 1,
      product_name: 'Chromed Adjustable Wrenches 250mm',
      category_id: 1,
      brand_id: 1,
      product_desc: 'Kunci tang 250mm buatan Kennedy',
      product_price: 665000,
      product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714928774/Trindo/zjq2q9hqq2kbfs4ixacl.jpg',
      product_stock: 15
    },
    {
      product_id: 2,
      product_name: 'Chromed Adjustable Wrenches 200mm',
      category_id: 1,
      brand_id: 1,
      product_desc: 'Kunci tang 200mm buatan Kennedy',
      product_price: 549000,
      product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714928945/Trindo/kvihsz85f8vcqyw3vdzc.jpg',
      product_stock: 15
    },
    {
      product_id: 3,
      product_name: 'Chromed Adjustable Wrenches 300mm',
      category_id: 1,
      brand_id: 1,
      product_desc: 'Kunci tang 300mm buatan Kennedy',
      product_price: 1020000,
      product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714928992/Trindo/gxtzmg4sc08wynenoscj.jpg',
      product_stock: 15
    },
    {
      product_id: 4,
      product_name: 'Metric Combination Wrenches 10mm',
      category_id: 1,
      brand_id: 2,
      product_desc: 'Kunci tang kombinasi 10mm buatan Facom',
      product_price: 150000,
      product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929164/Trindo/zosyuboqdrhisekmfh6b.jpg',
      product_stock: 100
    },
    {
      product_id: 5,
      product_name: 'Metric Combination Wrenches 12mm',
      category_id: 1,
      brand_id: 2,
      product_desc: 'Kunci tang kombinasi 12mm buatan Facom',
      product_price: 141000,
      product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929204/Trindo/pxsqcwfgmovjbxf1vgq1.jpg',
      product_stock: 100
    },
    // {
    //   product_id: 6,
    //   product_name: 'Metric Combination Wrenches 14mm',
    //   category_id: 1,
    //   brand_id: 2,
    //   product_desc: 'Kunci tang kombinasi 14mm buatan Facom',
    //   product_price: 155000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929240/Trindo/ublwm2p2i5xisnawn2xk.jpg',
    //   product_stock: 200
    // },
    // {
    //   product_id: 7,
    //   product_name: 'Metric Combination Wrenches 15mm',
    //   category_id: 1,
    //   brand_id: 2,
    //   product_desc: 'Kunci tang kombinasi 15mm buatan Facom',
    //   product_price: 180000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929274/Trindo/umzmdlvs2sjt4dydxmka.jpg',
    //   product_stock: 200
    // },
    // {
    //   product_id: 8,
    //   product_name: 'Metric Combination Wrenches 16mm',
    //   category_id: 1,
    //   brand_id: 2,
    //   product_desc: 'Kunci tang kombinasi 16mm buatan Facom',
    //   product_price: 188000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929322/Trindo/c79xoyasvn8ngn5pfllf.jpg',
    //   product_stock: 200
    // },
    // {
    //   product_id: 9,
    //   product_name: 'Metric Combination Wrenches 22mm',
    //   category_id: 1,
    //   brand_id: 2,
    //   product_desc: 'Kunci tang kombinasi 22mm buatan Facom',
    //   product_price: 280000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929411/Trindo/sshcjbudxoydlbmsxxtb.jpg',
    //   product_stock: 200
    // },
    // {
    //   product_id: 10,
    //   product_name: 'Metric Long-Reach Combination Wrenches',
    //   category_id: 1,
    //   brand_id: 2,
    //   product_desc: 'Kunci tang kombinasi ukuran 19mm-41mm',
    //   product_price: 900000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929456/Trindo/codbalco88cjqejnbssn.jpg',
    //   product_stock: 30
    // },
    // {
    //   product_id: 11,
    //   product_name: 'Tool Set Kennedy - 83pcs',
    //   category_id: 1,
    //   brand_id: 1,
    //   product_desc: 'Set alat perkakas berjumlah 83pcs oleh Kennedy',
    //   product_price: 19490000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929523/Trindo/xmjeclkwq4ttzcjbgrca.webp',
    //   product_stock: 30
    // },
    // {
    //   product_id: 12,
    //   product_name: 'Cordless Impact Wrench - Metabo',
    //   category_id: 1,
    //   brand_id: 3,
    //   product_desc: 'Kunci tang listrik bertenaga battery',
    //   product_price: 9200000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929661/Trindo/gk594cxe3wv9vqxhmvvo.jpg',
    //   product_stock: 45
    // },
    // {
    //   product_id: 13,
    //   product_name: 'Hand Riveter - Usag',
    //   category_id: 1,
    //   brand_id: 4,
    //   product_desc: 'Tang Rivet / Hand Riveter yang digunakan untuk memasang paku rivet',
    //   product_price: 1530000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929754/Trindo/utwz27vqbd5ajiyst0uz.jpg',
    //   product_stock: 60
    // },
    // {
    //   product_id: 14,
    //   product_name: '2lb Ball Pein Hammer',
    //   category_id: 2,
    //   brand_id: 1,
    //   product_desc: 'Palu ball pein 2lb buatan Kennedy',
    //   product_price: 462000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929808/Trindo/oxqrzwsouhriyiqcmwt3.webp',
    //   product_stock: 40
    // },
    // {
    //   product_id: 15,
    //   product_name: '7lb Sledged Hammer Hickory Shaft',
    //   category_id: 2,
    //   brand_id: 1,
    //   product_desc: 'Palu sledged 7lb buatan Kennedy',
    //   product_price: 1454000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929848/Trindo/c9n2aizxxq76x56dbbic.jpg',
    //   product_stock: 40
    // },
    // {
    //   product_id: 16,
    //   product_name: '38mm DIA Nylon Hammer Plastic Handle',
    //   category_id: 2,
    //   brand_id: 1,
    //   product_desc: 'Palu 38mm dengan pegangan plastik buatan Kennedy',
    //   product_price: 428500,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930679/Trindo/lbogo6tjzhakhg8ckrpv.jpg',
    //   product_stock: 30
    // },
    // {
    //   product_id: 17,
    //   product_name: 'Ballpein Hammer Steel Tube',
    //   category_id: 2,
    //   brand_id: 1,
    //   product_desc: 'Palu ball pein steel tube buatan Kennedy',
    //   product_price: 333000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929941/Trindo/qffis85fhikutm65gmao.jpg',
    //   product_stock: 0
    // },
    // {
    //   product_id: 18,
    //   product_name: '380/1000 Sledge Hammers',
    //   category_id: 2,
    //   brand_id: 4,
    //   product_desc: 'Palu 380/1000 buatan Usag',
    //   product_price: 490800,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714929990/Trindo/vlg65gek8frz5zxmwo9l.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 19,
    //   product_name: '380/800 Hammers For Mechanics',
    //   category_id: 2,
    //   brand_id: 4,
    //   product_desc: 'Palu 380/800 untuk mekanik buatan Usag',
    //   product_price: 421000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930755/Trindo/jxvfe3aexgpjjfvk7t3d.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 20,
    //   product_name: '380/2000 Sledge Hammer',
    //   category_id: 2,
    //   brand_id: 4,
    //   product_desc: 'Palu 380/2000 buatan Usag',
    //   product_price: 546000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930064/Trindo/c6h59tewi584bclleso7.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 21,
    //   product_name: '382 F/800 Hammers For Mechanics With Graphite Handle',
    //   category_id: 2,
    //   brand_id: 4,
    //   product_desc: 'Palu dengan pegangan graphite 382 F/800 buatan Usag',
    //   product_price: 632000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930101/Trindo/w56lzjapxtabypks3mss.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 22,
    //   product_name: 'Hammer Tacker Heavy Duty',
    //   category_id: 2,
    //   brand_id: 5,
    //   product_desc: 'Stapler palu yang digunakan untuk mengamankan bahan bangunan lembaran plastik dan kertas tipis pada permukaan datar',
    //   product_price: 630000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930151/Trindo/acvdrdfbqcvptu79bkma.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 23,
    //   product_name: 'Nylon Faced Blow Hammer 38mm',
    //   category_id: 2,
    //   brand_id: 6,
    //   product_desc: 'Palu nylon ukuran 38mm',
    //   product_price: 584200,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930190/Trindo/gcrucl3xacgwcredq61r.webp',
    //   product_stock: 20
    // },
    // {
    //   product_id: 24,
    //   product_name: 'Nylon Faced Hammer 32mm',
    //   category_id: 2,
    //   brand_id: 6,
    //   product_desc: 'Palu nylon ukuran 32mm',
    //   product_price: 326600,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930234/Trindo/wonmhls5ajx7oexjq2t5.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 25,
    //   product_name: 'Teflon Hammer 38mm',
    //   category_id: 2,
    //   brand_id: 6,
    //   product_desc: 'Palu Teflon ukuran 38mm',
    //   product_price: 396750,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930280/Trindo/hzpwiohpdztkcwer4s96.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 26,
    //   product_name: '28oz 50mm PVC Deadblow Hammer',
    //   category_id: 2,
    //   brand_id: 7,
    //   product_desc: 'Palu deadblow PVC ukuran 50mm 28oz',
    //   product_price: 412000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930315/Trindo/crmdh3prkf9510a643cr.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 27,
    //   product_name: 'Ball Pein Hammer 0.5lb',
    //   category_id: 2,
    //   brand_id: 8,
    //   product_desc: 'Palu ball pein 0.5lb',
    //   product_price: 242300,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930357/Trindo/ck9knjh1m8icyvw0yel2.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 28,
    //   product_name: 'Ballpein Hammer 1.1/2lb Brass 210-5B-1008',
    //   category_id: 2,
    //   brand_id: 9,
    //   product_desc: 'Palu ball pein 2lb brass buatan Krisbow',
    //   product_price: 1295000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930406/Trindo/imgalmqbmza8pxmq0l8p.jpg',
    //   product_stock: 20
    // },
    // {
    //   product_id: 29,
    //   product_name: '2Speed Percussion Drill',
    //   category_id: 3,
    //   brand_id: 10,
    //   product_desc: 'Bor listrik 1100 Watt',
    //   product_price: 6200000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930449/Trindo/aqh00sjyztmfjbtjvyqt.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 30,
    //   product_name: 'Rotary Hammer 38mm-SDS Max',
    //   category_id: 3,
    //   brand_id: 11,
    //   product_desc: 'Bor listrik buatan Hitachi dengan mata bor 38mm',
    //   product_price: 7500000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930502/Trindo/hfjjyeui1v0qctavcjxq.webp',
    //   product_stock: 10
    // },
    // {
    //   product_id: 31,
    //   product_name: 'Cordless Driver Drill Hitachi',
    //   category_id: 3,
    //   brand_id: 11,
    //   product_desc: 'Bor bertenaga listrik baterai buatan Hitachi',
    //   product_price: 4800000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930638/Trindo/uqbtccjaypzpamlf2jwr.jpg',
    //   product_stock: 5
    // },
    // {
    //   product_id: 32,
    //   product_name: 'Angle Drill 10mm Makita',
    //   category_id: 3,
    //   brand_id: 12,
    //   product_desc: 'Bor angle 10mm buatan Makita',
    //   product_price: 6250000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714930860/Trindo/lmdnfiebjsswticcgea0.webp',
    //   product_stock: 5
    // },
    // {
    //   product_id: 33,
    //   product_name: '18V Hammer Drill 13mm',
    //   category_id: 3,
    //   brand_id: 12,
    //   product_desc: 'Bor buatan Makita 18v',
    //   product_price: 2066000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931087/Trindo/pb81ydmfkdu2ujzeloqe.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 34,
    //   product_name: 'Cordless Drill 18v Makita',
    //   category_id: 3,
    //   brand_id: 12,
    //   product_desc: 'Bor baterai 18v buatan Makita',
    //   product_price: 3000000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931135/Trindo/tosrn0uyp3v2kijyndom.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 35,
    //   product_name: 'Cordless Drill Brushless Bosch',
    //   category_id: 3,
    //   brand_id: 13,
    //   product_desc: 'Bor bertenaga baterai brushless buatan Bosch',
    //   product_price: 6200000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931176/Trindo/kpgxi3owx1kgsyhiq1ir.webp',
    //   product_stock: 5
    // },
    // {
    //   product_id: 36,
    //   product_name: 'Electric Hammer Drill',
    //   category_id: 3,
    //   brand_id: 13,
    //   product_desc: 'Bor palu listrik buatan Bosch',
    //   product_price: 6360000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931215/Trindo/ls9u7gm5eslusj9ppirz.webp',
    //   product_stock: 5
    // },
    // {
    //   product_id: 37,
    //   product_name: '18v Cordless Combi Drill',
    //   category_id: 3,
    //   brand_id: 13,
    //   product_desc: 'Bor bertrenaga listrik baterai 18v buatan Bosch',
    //   product_price: 3850000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931250/Trindo/hggdr7hsdb92xidu2ggx.webp',
    //   product_stock: 5
    // },
    // {
    //   product_id: 38,
    //   product_name: 'Hand Drill & Impact (Battery) Dewalt',
    //   category_id: 3,
    //   brand_id: 10,
    //   product_desc: 'Bor palu bertenaga listrik baterai buatan Dewalt',
    //   product_price: 9562500,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931307/Trindo/rseqyuc5rx6iz5vtbxyv.jpg',
    //   product_stock: 15
    // },
    // {
    //   product_id: 39,
    //   product_name: '2 Speed Percussion Drill 1100w Dewalt',
    //   category_id: 3,
    //   brand_id: 10,
    //   product_desc: 'Bor perkusi atau palu 1100w buatan Dewalt',
    //   product_price: 6166000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931351/Trindo/yxcqoslhifugge8bxkcf.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 40,
    //   product_name: 'S8B18LTBL Cordless Impact Drill',
    //   category_id: 3,
    //   brand_id: 3,
    //   product_desc: 'Bor listrik dengan menggunakan battery',
    //   product_price: 8300000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931392/Trindo/mctra3kywbraiqaqyr70.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 41,
    //   product_name: 'Angle Grinder 4inch/100mm',
    //   category_id: 4,
    //   brand_id: 13,
    //   product_desc: 'Mesin gerinda 4inch/100mm buatan Bosch',
    //   product_price: 550000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931445/Trindo/fws12rxjmzieqkr48tfv.webp',
    //   product_stock: 5
    // },
    // {
    //   product_id: 42,
    //   product_name: 'Angle Grinder 5/125mm',
    //   category_id: 4,
    //   brand_id: 10,
    //   product_desc: 'Mesin gerinda 5/125mm buatan Dewalt',
    //   product_price: 942000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931485/Trindo/zl8gjbwgh7nfrrngy6ug.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 43,
    //   product_name: 'Angle Grinder 800w 115mm Dewalt',
    //   category_id: 4,
    //   brand_id: 10,
    //   product_desc: 'Mesin gerinda 800w 115mm buatan Dewalt',
    //   product_price: 1705000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931677/Trindo/nqwcufvzyxq7j0m5zvye.webp',
    //   product_stock: 10
    // },
    // {
    //   product_id: 44,
    //   product_name: '18v XR 125mm Brushless Angle Grinder Battery (AH)-No Female Square Drive MM-310 Dewalt',
    //   category_id: 4,
    //   brand_id: 10,
    //   product_desc: 'Mesin gerinda baterai 18v 310mm buatan Dewalt',
    //   product_price: 6125000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931719/Trindo/qjk25rm0uss1whzsogat.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 45,
    //   product_name: 'Angle Grinder 4" Makita',
    //   category_id: 4,
    //   brand_id: 12,
    //   product_desc: 'Mesin gerinda 4inch buatan Makita',
    //   product_price: 1250000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931756/Trindo/y4mfnynrazbq9ph4e4q6.webp',
    //   product_stock: 15
    // },
    // {
    //   product_id: 46,
    //   product_name: 'Angle Grinder 230v-9" Makita',
    //   category_id: 4,
    //   brand_id: 12,
    //   product_desc: 'Mesin gerinda 230v-9" buatan Makita',
    //   product_price: 2750000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931792/Trindo/dhxppkjsg2p3u45xe6km.jpg',
    //   product_stock: 15
    // },
    // {
    //   product_id: 47,
    //   product_name: 'Angle Grinder 4"/100mm Metabo',
    //   category_id: 4,
    //   brand_id: 3,
    //   product_desc: 'Mesin gerinda 4"/100mm buatan Metabo',
    //   product_price: 2200000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931833/Trindo/rlwpqisrcu6px5ivkfqa.webp',
    //   product_stock: 15
    // },
    // {
    //   product_id: 48,
    //   product_name: 'Bench Grinder 200mm Metabo',
    //   category_id: 4,
    //   brand_id: 3,
    //   product_desc: 'Mesin gerinda meja 200mm buatan Metabo',
    //   product_price: 7490000,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931865/Trindo/krimteotb7w9s2kulph4.jpg',
    //   product_stock: 15
    // },
    // {
    //   product_id: 49,
    //   product_name: 'B3456 1/4inch (6mm) Straight Die Grinder',
    //   category_id: 4,
    //   brand_id: 14,
    //   product_desc: 'Mesin gerinda lurus 1/4inch (6mm) buatan Kobe',
    //   product_price: 1271600,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931902/Trindo/oqzf4g9s9rknr9o07sox.jpg',
    //   product_stock: 10
    // },
    // {
    //   product_id: 50,
    //   product_name: '100mm (4) 700w Angle Grinder 240v',
    //   category_id: 4,
    //   brand_id: 14,
    //   product_desc: 'Mesin gerinda 100mm (4) 700w 240v buatan Kobe',
    //   product_price: 1145760,
    //   product_image: 'http://res.cloudinary.com/dddrzjxb0/image/upload/v1714931934/Trindo/uvq7eslkbqyjt5xpjcic.webp',
    //   product_stock: 10
    // }
  ]);
}
