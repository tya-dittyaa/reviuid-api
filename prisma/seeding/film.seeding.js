// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.films.deleteMany();

  const films = await prisma.films.createMany({
    data: [
      {
        title: 'Yang Tak Tergantikan',
        synopsis:
          'Aryati seorang janda dengan pekerjaan sebagai driver online harus menghidupi ketiga anaknya. Ia harus menghadapi banyak tantangan untuk menjaga keluarganya tetap bersama.',
        genre: ['DRAMA', 'KELUARGA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2021, 0, 15, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2021, 2, 15, 0, 0, 0, 0)),
        poster:
          'https://thumbor.prod.vidiocdn.com/a8BtReaMILpe2Ahh7QgMVw7XhR8=/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/8562/yang-tak-tergantikan-cf53b7.jpg',
        trailer: 'https://youtu.be/MKo1UV3ykIU?si=axKKBngt2XFyKal7',
      },
      {
        title: 'Badarawuhi di Desa Penari',
        synopsis:
          'Desa itu masih menyimpan misteri. Kepingan demi kepingan misteri terungkap, termasuk teror dari entitas paling ditakuti yaitu, BADARAWUHI.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 3, 11, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 6, 11, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171196601780400_287x421.jpg',
        trailer: 'https://www.youtube.com/watch?v=7-6Hv3DryC8',
      },
      {
        title: 'The Architecture of Love (TAOL)',
        synopsis:
          "Raia (Putri Marino), seorang penulis best seller yang tak lagi mampu menulis, memutuskan terbang ke New York mengejar inspirasi. Kota ini mempertemukannya dengan River (Nicholas Saputra), seorang arsitek yang misterius. Perjumpaan itu menjadi awal pertemanan 'rahasia' di antara keduanya. Mereka bisa saling menyembuhkan tapi bisa juga saling melukai.",
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 3, 30, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 5, 30, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171229069497776_287x421.jpg',
        trailer: 'https://www.youtube.com/watch?v=tLJp0OEZUso',
      },
      {
        title: 'Temurun',
        synopsis:
          'Setelah meninggalnya sang Ibu akibat sebuah kelalaian anak pertama, Dewi (Yasamin Jasem) dan Sena (Bryan Domani) dijemput oleh sang Ayah (Kiki Narendra) untuk tinggal bersama di kota dan mewariskan perusahaan produksi daging milik keluarga. Namun saat tiba disana, keduanya mesti menghadapi segala teror, trauma, serta sosok nenek kandung mereka, Gayatri (Jajang C. Noer), yang mulai menunjukan wujud aslinya.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 4, 30, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 6, 30, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171465454079453_287x421.jpg',
        trailer: 'https://youtu.be/6QGYK9icpJo?si=MSHorBwdDe0-BxcO',
      },
      {
        title: 'Tuhan Izinkan Aku Berdosa',
        synopsis:
          'Kiran (Aghniny Haque) seorang perempuan yang tekun dalam berdakwah dan menerapkan prinsip-prinsip syariat Islam dalam kehidupannya. Bersama organisasi Islam Dariyah, Kiran berusaha memperjuangkan sistem khilafah yang dianggapnya sesuai dengan ajaran Islam.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 4, 22, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 6, 22, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171456041847508_287x421.jpg',
        trailer: 'https://www.youtube.com/watch?v=6GxK9LsRQM4',
      },
      {
        title: 'Possession: Kerasukan',
        synopsis:
          'FARIS (Darius Sinathrya) yang baru pulang dari tugas ketentaraan berbulan-bulan, langsung disambut oleh permintaan cerai dari istrinya, RATNA (Carissa Perusset). Curiga ada laki-laki lain di balik perilaku aneh Ratna, Faris ingin menyelidiki berbagai kemungkinan, termasuk perselingkuhan. Tapi, yang sebenarnya terjadi mungkin di luar apa yang dia pikirkan, berujung pada sesuatu yang lebih menyeramkan dari yang dia duga.',
        genre: ['DRAMA', 'HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 4, 8, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 6, 8, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171229180745163_287x421.jpg',
        trailer: 'https://www.youtube.com/watch?v=mgXog8uPtPs',
      },
      {
        title: 'Dua Hati Biru',
        synopsis:
          'Kelanjutan kisah Dua Garis Biru, tentang Bima (Angga Yunanda) dan Dara (Aisha Nurra Datau) yang berusaha membangun rumah tangga dan jadi orangtua terbaik untuk Adam (Farrell Rafisqy) di antara perbedaan mereka kini.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 3, 17, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 5, 17, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/17109994074491_287x421.jpg',
        trailer: 'https://www.youtube.com/watch?v=RxlI5cI93Ug',
      },
      {
        title: 'Miracle in Cell No. 7',
        synopsis:
          'Dodo Rozak hanya ingin menjadi ayah yang baik bagi anaknya, Kartika, sekalipun dia hanyalah pria dengan kecerdasan terbatas, bertingkah dan berperilaku seperti anak-anak. Pada kenyataannya, justru Kartika yang lebih sering menjaga dan merawat ayahnya. Tapi keduanya hidup bahagia. Kartika bangga pada ayahnya yang berjualan balon sehari-harinya.',
        genre: ['DRAMA', 'KELUARGA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 8, 8, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 10, 8, 0, 0, 0, 0)),
        poster:
          'https://id-test-11.slatic.net/p/2463e254b00d81713b78e680fb7e8f94.jpg',
        trailer: 'https://www.youtube.com/watch?v=0uf6QUacVgs',
      },
      {
        title: 'Mencuri Raden Saleh',
        synopsis:
          'Pencurian terbesar abad ini tinggal menghitung hari menjelang tanggal eksekusinya. Komplotan sudah lengkap dan siap menjalankan misi untuk mencuri lukisan sang maestro, Raden Saleh, yang berjudul Penangkapan Diponegoro. Pemalsuan, peretasan, pertarungan, dan manipulasi terjadi dalam pencurian berencana yang dijalankan oleh sekelompok anak muda amatiran.',
        genre: ['AKSI', 'DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 7, 25, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 9, 25, 0, 0, 0, 0)),
        poster:
          'https://m.media-amazon.com/images/M/MV5BNWZmOTIzOGMtODBmMC00MjVlLThjYzUtNjcxNjg4NzY0YTg1XkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_.jpg',
        trailer: 'https://m.youtube.com/watch?v=DN3sRz_veBU',
      },
      {
        title: 'My Stupid Boss',
        synopsis:
          'Diana tinggal di Kuala Lumpur mengikuti suaminya yang bekerja di sana. Diana kemudian melamar kerja di perusahaan milik Bossman. Bossman kebetulan adalah teman kuliah suaminya selama di Amerika.',
        genre: ['KOMEDI'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 4, 19, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 6, 19, 0, 0, 0, 0)),
        poster:
          'https://m.media-amazon.com/images/M/MV5BMzk1YzRkNmMtMTEzMC00MzhiLThhMWQtNzE2YzgzYWVmYzZhXkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_UY1200_CR105,0,630,1200_AL_.jpg',
        trailer: 'https://www.youtube.com/watch?v=FuC8H8eXZFU',
      },
      {
        title: 'Agak Laen',
        synopsis:
          'Demi mengejar mimpi untuk mengubah nasib, empat sekawan penjaga rumah hantu di Pasar Malam, mencari cara baru menakuti pengunjung agar selamat dari kebangkrutan. Sialnya, usaha Bene (Bene Dion Rajagukguk), Jegel (Indra Jegel), Boris (Boris Bokir), dan Oki (Oki Rengga) malah memakan korban jiwa salah satu pengunjungnya. Karena panik, korban tersebut mereka kubur di dalam rumah hantu. Di luar dugaan, arwah si korban malah gentayangan, membuat rumah hantunya jadi seram dan ramai pengunjung. Ketika polisi mulai menyelidiki, mereka terpaksa melakukan berbagai persekongkolan konyol untuk menutupi kejadian sebenarnya.',
        genre: ['KOMEDI', 'HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 1, 1, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 3, 1, 0, 0, 0, 0)),
        poster:
          'https://kaltimtoday.co/wp-content/uploads/2023/12/film-agak-laen-tayang-2024-instagrampilemagaklaen-657be9961ed83.webp',
        trailer: 'https://www.youtube.com/watch?v=0YLSPyGA4h0',
      },
      {
        title: 'Siksa Kubur',
        synopsis:
          'Setelah kedua orangtuanya jadi korban bom bunuh diri, Sita jadi tidak percaya agama. Sejak saat itu, tujuan hidup Sita hanya satu: mencari orang yang paling berdosa dan ketika orang itu meninggal, Sita ingin ikut masuk ke dalam kuburannya untuk membuktikan bahwa siksa kubur tidak ada dan agama tidak nyata. Namun, tentu ada konsekuensi yang mengerikan bagi mereka yang tak percaya.',
        genre: ['DRAMA', 'HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 3, 11, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 5, 11, 0, 0, 0, 0)),
        poster:
          'https://upload.wikimedia.org/wikipedia/id/b/bf/Poster_Siksa_Kubur.jpg',
        trailer: 'https://www.youtube.com/watch?v=DN7J1E8GTFI',
      },
      {
        title: 'Tegar',
        synopsis:
          'Tegar (M Aldifi Tegarajasa), anak berkebutuhan khusus, menginginkan bisa seperti anak pada umumnya: berteman dan bersekolah. Di hari ulang tahunnya yang ke-10, Tegar mengutarakan impiannya kepada kakeknya (Deddy Mizwar). Keputusan kakek untuk mewujudkan impian Tegar justru membuat kakek dan Wida (Sha Ine Febriyanti), ibu Tegar, berselisih. Tegar memutuskan untuk pergi dari rumah demi mengejar mimpinya.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 10, 24, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 12, 24, 0, 0, 0, 0)),
        poster:
          'https://upload.wikimedia.org/wikipedia/id/e/e1/Film_Tegar.jpeg',
        trailer: 'https://www.youtube.com/watch?v=qARKg4kVxLs',
      },
      {
        title: 'Mukidi',
        synopsis:
          'Mukidi (Gading Marten) mencari pekerjaan di Jakarta, tapi malah jatuh cinta lebih dulu, dan nikah dengan Markonah (Della Dartyan). Karena “keberuntungan/kebaikannya”, Mukidi dipekerjakan sebagai analis kredit. Mukidi menyetujui setiap permohonan kredit yang diajukan kepadanya karena ingin membantu orang lain. Meski maksudnya baik, semua keputusan Mukidi justru berubah menjadi bencana bagi kehidupannya dan kantornya. Karena Mukidi memberikan banyak kredit ke orang-orang, kantornya bangkrut. Dia terpaksa menjadi penagih hutang.',
        genre: ['KOMEDI'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 3, 11, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 5, 11, 0, 0, 0, 0)),
        poster:
          'https://tugumalang.id/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-15-at-10.56.28.jpeg',
        trailer: 'https://www.youtube.com/watch?v=ktx5u908L10',
      },
      {
        title: 'Menjelang Ajal',
        synopsis:
          'Sekar berusaha menghidupi tiga anaknya dengan membuka warung makan. Akhir-akhir ini ia resah karena dagangannya selalu basi sesaat setelah makanan dihidangkan. Sekar pergi menemui Mak Ambar, dukun yang memasang ‘penglaris’ di warungnya. Namun ternyata, Mak Ambar kemudian meninggal dunia. Sejak itu, Jin yang selama ini menolongnya menuntut nyawa. Sekar kerasukan tiap malam. Ketiga anaknya berusaha untuk mengobati, namun upaya itu malah mengancam nyawa mereka sekeluarga.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 3, 30, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 5, 30, 0, 0, 0, 0)),
        poster:
          'https://cdn.idntimes.com/content-images/post/20240320/img-5285-cc55ff00508c0f7986bd60cbccc30d67.jpeg',
        trailer: 'https://www.youtube.com/watch?v=anMG2fANUjw',
      },
      {
        title: 'Cinta Pertama, Kedua, dan Ketiga',
        synopsis:
          'Kisah Raja dan Asia yang memiliki kesamaan tanggung jawab, dalam mengurus kedua orang tua tunggal mereka masing-masing. Raja yang diperankan Angga Yunanda memilih ingin hidup mandiri seperti kakaknya, Asia yang diperankan Putri Marino. Ia memilih berbakti pada ibunya yang telah mengorbankan segalanya untuk dirinya.',
        genre: ['ROMANSA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 0, 6, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 2, 6, 0, 0, 0, 0)),
        poster:
          'https://cdns.klimg.com/kapanlagi.com/p/mv5bymuwzjuyyjgtzdeyny00ngzklthkngmtm2rhzdm1yjriogfhxkeyxkfqcgdeqxvymtezmti1mjk3._v1_.jpg',
        trailer: 'https://www.youtube.com/watch?v=I4ldTbNASuE',
      },
      {
        title: 'Ben & Jody',
        synopsis:
          'Ben (Chicco Jerikho) yang sejak keluar dari Filosofi Kopi, Ben kini aktif membela kelompok petani untuk melawan perusahaan, kini menghilang. Jody (Rio Dewanto) sebagai sahabat setianya pun melakukan pencarian untuk menemukan keberadaan Ben.',
        genre: ['DRAMA', 'AKSI'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 0, 22, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 2, 22, 0, 0, 0, 0)),
        poster:
          'https://cdns.klimg.com/kapanlagi.com/p/mv5bmtgwmmq2zdatodfizc00nwzkltg4ogytognlyznmyjmwntqyxkeyxkfqcgdeqxvynzeznju1ndg._v1_.jpg',
        trailer: 'https://youtu.be/RHTrW0LN3E4',
      },
      {
        title: 'Ku Kira Kau Rumah',
        synopsis:
          'Niskala (Prilly Latuconsina), sosok wanita yang didiagnosa Bipolar sedari masih kecil. Hingga pertemuan Niskala dengan Pram (Jourdy Pranata), sosok pria yang merasa kesepian semenjak sang ayah meninggal, dan sang ibu sibuk bekerja. Masalah besar menghujam kebahagiaan Niskala hingga Pram, bahkan rela meninggal dengan terjun dari lantai atas setelah peristiwa percekcokan antara Niskala dengan sang ayahnya.',
        genre: ['DRAMA', 'PSIKOLOGIS'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 1, 3, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 3, 3, 0, 0, 0, 0)),
        poster:
          'https://cdns.klimg.com/kapanlagi.com/p/mv5byzk0mgvlnzktmjczos00odi2lthhy2ytzwjhnguznwyxmwnlxkeyxkfqcgdeqxvymtezmti1mjk3._v1_fmjpg_ux1000_.jpg',
        trailer: 'https://youtu.be/yLIY-yaF9tE',
      },
      {
        title: 'Geez & Ann',
        synopsis:
          'Kisah cinta antara Gezz dan Ann. Cinta mereka bermula dari acara pentas seni sekolah. Sayangnya, perjalanan cinta mereka juga tidak semulus yang dibayangkan. Apalagi saat mereka harus menjalani LDR karena Geez harus menempuh kuliah di luar negeri.',
        genre: ['ROMANSA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 1, 25, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 3, 25, 0, 0, 0, 0)),
        poster: 'https://suarausu.or.id/wp-content/uploads/2021/03/geez.jpg',
        trailer: 'https://youtu.be/Bfjdeh_Vcz4',
      },
      {
        title: 'Gita Cinta dari SMA',
        synopsis:
          'RATNA SUMINAR (Prilly Latuconsina), sang siswi baru bertemu dengan GALIH RAKASIWI (Yesaya Abraham) sebagai sosok yang dingin dan cuek. Hingga kemudian keduanya saling terpikat. Namun, hubungan mereka ditentang oleh Ayah Ratna (Dwi Sasono). Berbagai cara digunakan untuk memisahkan mereka. Akankah Galih dan Ratna menerima kenyataan jika kisah kasih mereka, memang tak kan pernah sampai?',
        genre: ['ROMANSA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 1, 9, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 3, 9, 0, 0, 0, 0)),
        poster:
          'https://akcdn.detik.net.id/community/media/visual/2023/02/14/gita-cinta-dari-sma_34.jpeg?w=375',
        trailer: 'https://www.youtube.com/watch?v=j92YfcwLacM',
      },
      {
        title: 'Ngenest',
        synopsis:
          'Seorang pria keturunan etnis tionghoa yang mengalami berbagai bentuk pelecehan sejak kecil dan menjadi korban bully di sekolahnya.',
        genre: ['KOMEDI', 'ROMANSA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2021, 11, 30, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2022, 1, 30, 0, 0, 0, 0)),
        poster:
          'https://thumbor.prod.vidiocdn.com/9Kn3FY7Ph6Q6Fp7ynG7NGyE3j1Q=/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/121/ngenest-f0d895.png',
        trailer: 'https://youtu.be/IaOUyyIcSko?si=ANdkk_V3Q4XHG4Nz',
      },
      {
        title: '5 CM',
        synopsis:
          'Lima sahabat mencoba mencari tahu apa sebenarnya persahabatan itu dengan mendaki Gunung Semeru, puncak tertinggi di Jawa.',
        genre: ['PETUALANGAN', 'ROMANSA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2012, 11, 12, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2013, 1, 12, 0, 0, 0, 0)),
        poster:
          'https://upload.wikimedia.org/wikipedia/id/f/f9/5_cm_%28poster%29.jpg',
        trailer: 'https://youtu.be/wT2aPdXwdt8?si=rkC3smvxFvemwVfE',
      },
      {
        title: 'Warkop DKI Reborn: Jangkrik Boss! Part 1',
        synopsis:
          'Dono, Kasino, Indro kembali beraksi di tengah hiruk pikuknya Jakarta. Mereka sekali lagi berperan sebagai personel sebuah Lembaga Swasta yang bernama CHIIPS.',
        genre: ['PETUALANGAN', 'KOMEDI'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2016, 9, 2, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2016, 11, 2, 0, 0, 0, 0)),
        poster:
          'https://cdn.gramedia.com/uploads/items/9786021456866_warkop_dki_reborn_jangkrik_boss_part-1.jpg',
        trailer: 'https://youtu.be/IwtfPXwLlDg?si=LilSBkp9XT1ad06s',
      },
      {
        title: 'Laskar Pelangi 2: Edensor',
        synopsis:
          'Film ketiga dalam serial Laskar Pelangi dan sekuel dari Sang Pemimpi ini menggambarkan dua anak laki-laki desa yang mendapati diri mereka tinggal di Paris dan harus menyesuaikan diri dengan budaya baru.',
        genre: ['PETUALANGAN', 'DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2013, 11, 24, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2014, 1, 24, 0, 0, 0, 0)),
        poster:
          'https://images.tokopedia.net/img/cache/700/product-1/2018/7/21/3360727/3360727_84113821-07a7-4d36-a0f1-3162fcf1b648_420_600.jpg',
        trailer: 'https://youtu.be/GwtehuT7FPA?si=h5J4UjsRpJ_5PJ-n',
      },
      {
        title: 'Si Juki The Movie: Panitia Hari Akhir',
        synopsis:
          'Si Juki adalah selebriti yang sedang di puncak ketenaran. Sikapnya yang polos, jenaka, dan berani beda membuatnya dicintai semua orang. Ketika sebuah meteor jatuh dan mengancam akan menghancurkan negeri ini, mampukah Juki menyelamatkan Indonesia?',
        genre: ['ANIMASI', 'KOMEDI'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2017, 11, 28, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2018, 1, 28, 0, 0, 0, 0)),
        poster:
          'https://m.media-amazon.com/images/M/MV5BMjE2Yjc0OGItODUzMS00MmQzLTg1MTUtOTE0ZWI1YjA3OTUxXkEyXkFqcGdeQXVyNjcyODMyNTM@._V1_FMjpg_UX1000_.jpg',
        trailer: 'https://youtu.be/l0R7hzZTq3E?si=pFjWlkIKHdTp-iIB',
      },
      {
        title: 'Bulan Terbelah di Langit Amerika',
        synopsis:
          'Sepasang suami istri, Hanum dan Rangga, mencoba mengungkap apa yang sebenarnya terjadi dalam tragedi 9/11 dari sudut pandang mereka.',
        genre: ['PETUALANGAN', 'DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2015, 11, 1, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2016, 1, 1, 0, 0, 0, 0)),
        poster:
          'https://balitbangdiklat.kemenag.go.id/images/resensi/Langit.jpg',
        trailer: 'https://youtu.be/5qVqm9qyCb0?si=sKzZZz-GSYb-HSVh',
      },
      {
        title: 'Paku Tanah Jawa',
        synopsis:
          'Ningrum tumbuh dengan dihantui pandangan sebelah mata dari warga karena sang ibu digadang-gadang punya banyak pria sebagaii syarat pesugihan. Hidup Ningrum makin tak tenang ketika pria yang ia cintai, Jalu, justru terjebak menjadi tumbal baru ibunya.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 5, 6, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 7, 6, 0, 0, 0, 0)),
        poster:
          'https://lsf.go.id/wp-content/uploads/2024/05/PF-Paku-Tanah-Jawa.jpg',
        trailer: 'https://youtu.be/aGT6OfGQgIM',
      },
      {
        title: 'Vina: Sebelum 7 Hari',
        synopsis:
          'Kisah misterius mengelilingi kematian mendadak Vina yang jasadnya ditemukan tergeletak di flyover Cirebon, diduga sebagai korban kecelakaan motor tunggal. Namun, kecurigaan muncul ketika Nenek Vina meragukan kecelakaan itu karena luka-luka pada tubuh Vina yang tampak tidak wajar. Tanpa cukup bukti untuk menantang laporan resmi, sebuah keajaiban terjadi: roh Vina mendiami tubuh sahabatnya, Linda. Dengan waktu hanya tujuh hari setelah kematiannya, Vina melalui Linda berusaha keras menguak kebenaran yang tersembunyi di balik tragedi tersebut. Alfatihah untuk jiwa yang berjuang menemukan keadilan.',
        genre: ['HOROR', 'DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 4, 8, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 6, 8, 0, 0, 0, 0)),
        poster:
          'https://cdn0-production-images-kly.akamaized.net/B71_o5jE0oafs6BJE6kYjUsrFuI=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4788068/original/098782300_1711640348-434543288_18301507306157327_5210704004272573197_n.jpg',
        trailer: 'https://youtu.be/ZATcjbH6mok',
      },
      {
        title: 'Dilan 1983 WO AI NI',
        synopsis:
          'Setelah 1.5 tahun tinggal di Timor Timur, Dilan kembali bertemu teman lama SD-nya di Bandung. Ketika ia tiba di Bandung, ia menemui anak pindahan dari Semarang yang sontak mencuri perhatiannya, Mei Lien. Mei Lien yang merupakan keturunan Tionghoa membuat Dilan belajar bahasa Mandarin dan membuat keluarganya terkejut. Kisah keduanya berlanjut di kota Bandung yang kala itu masih sunyi.',
        genre: ['DRAMA', 'KELUARGA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 5, 13, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 7, 13, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171585280842105_287x421.jpg',
        trailer: 'https://youtu.be/-TqgMfZg4Po',
      },
      {
        title: 'Lafran',
        synopsis:
          'Lafran Pane (Dimas Anggara) menyadari pentingnya perjuangan mahasiswa Islam untuk mendapatkan wadah. Pada tahun 1947, ia mendirikan Himpunan Mahasiswa Islam (HMI). Lafran memiliki visi agar mahasiswa memahami Islam secara mendalam, mampu bergerak secara mandiri tanpa afiliasi pada partai politik, dan yang terpenting, memiliki kepedulian terhadap umat dan bangsa demi kemajuan Indonesia.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 5, 20, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 7, 20, 0, 0, 0, 0)),
        poster:
          'https://cdn0-production-images-kly.akamaized.net/EIiEZXs9nJ7Nudz8xU686wZJh48=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4659681/original/006704300_1700711366-FA_KIRIM_POSTER_70x100_-_LAFRAN_CREDIT_TEASER_-_171123__1_.jpeg',
        trailer: 'https://youtu.be/WW65SFYu3Js',
      },
      {
        title: 'Sengkolo Malam Satu Suro',
        synopsis:
          'Ibrahim adalah seorang pemandi jenazah yang kehilangan keluarganya dalam kejadian mengerikan hingga memutuskan untuk berhenti dari pekerjaannya. Ketika keluarga kaya di kampungnya mati misterius, warga percaya itu ilmu hitam. Tidak ada pemandi yang mau memandikan mereka, hingga Pak Kades meminta bantuan Ibrahim. Meskipun enggan, Ibrahim mengiyakan ajakannya Setelah setahun, dia menemukan petunjuk tentang kematian keluarganya dan menghadapi kejahatan yang menunggunya di rumah terkutuk itu.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 5, 20, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 7, 20, 0, 0, 0, 0)),
        poster:
          'https://asset.kompas.com/crops/E17uyOy3U95AsNKNSRFdTsrVYmk=/552x108:1848x972/750x500/data/photo/2024/05/30/66585ac810fd5.jpg',
        trailer: 'https://youtu.be/mB8DCB42w8E',
      },
      {
        title: 'Sekawan Limo',
        synopsis:
          'Lima pemuda dipersatukan dalam pendakian Gunung Madyopuro. Mereka gagal mematuhi mitos Rombongan harus genap dan dilarang menoleh ke belakang atau akan ada yang mengikuti!. Sepanjang perjalanan mereka terus dihantui hingga akhirnya sadar kalau dari berlima salah satu bukan manusia. Siapa yang hantu di antara mereka.',
        genre: ['KOMEDI', 'HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 6, 4, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 8, 4, 0, 0, 0, 0)),
        poster:
          'https://media.21cineplex.com/webcontent/gallery/pictures/171767092079763_287x421.jpg',
        trailer: 'https://youtu.be/ERZncVUuKlk',
      },
      {
        title: 'Jurnal Risa by Risa Saraswati',
        synopsis:
          'Kamera dokumenter menangkap perjalanan menegangkan tim Jurnal Risa saat mereka berusaha menyelamatkan bintang tamu mereka, Prinsa. Mereka dikejar oleh hantu yang paling mereka takutkan, Samex, yang selalu muncul setiap kali namanya disebut.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 6, 11, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 8, 11, 0, 0, 0, 0)),
        poster: 'https://cdns.klimg.com/kapanlagi.com/p/jurnalrisa4.jpg',
        trailer: 'https://youtu.be/D3Fq03N668w',
      },
      {
        title: 'Catatan Harian Menantu Sinting',
        synopsis:
          'Minar adalah istri dari Sahat, seorang pria Batak yang masih kental kebudayaan Bataknya, terutama dengan tuntutan sang mama. Ibu dari Sahat kerap menuntut kehadiran cucu laki-laki karena baginya, kehadiran cucu laki-laki sebgaai penerus marga adalah bukti cinta. Ia sampai menghadiahkan ranjang keramat pada Minar dan Sahat, namun Minar justru ingin keluar dari kekangannya.',
        genre: ['KOMEDI', 'DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 6, 18, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 8, 18, 0, 0, 0, 0)),
        poster:
          'https://m.media-amazon.com/images/M/MV5BYzcyMDEwMGMtZTk0Yy00NmU1LThkMzQtYjEwMGIwZDk3Y2Q3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
        trailer: 'https://youtu.be/YiFgGChGQV8',
      },
      {
        title: 'Pusaka',
        synopsis:
          'Sebuah vila besar milik seorang kolektor (Slamet Rahardjo), yang sedang dalam proses renovasi untuk dijadikan museum, menjadi jebakan bagi para pekerja proyek yang tengah melakukan survei. Kutukan yang terlepas dari vila tersebut mulai membunuh mereka satu per satu.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 6, 18, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 8, 18, 0, 0, 0, 0)),
        poster:
          'https://cms.disway.id//uploads/17ec4a15e5e94848ae57d7a0ef861d05.jpg',
        trailer: 'https://youtu.be/AouSK44vPZo',
      },
      {
        title: 'Saat Menghadap Tuhan',
        synopsis:
          'Damar adalah seorang remaja yang punya rekam jejak yang kelam, membunuh di usia 10 tahun, Ketika menginjak usia remaja, ia dihadapi situasi yang amat menguji kesabarannya ketika dua sahabatnya menjadi korban perundungan dan kekerasan seksual.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 5, 6, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 7, 6, 0, 0, 0, 0)),
        poster:
          'https://m.media-amazon.com/images/M/MV5BMjcxYjM5NDgtZDgzOS00MTFmLWI5ZmQtYWY4ZjFmYjMxYjM0XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg',
        trailer: 'https://youtu.be/6QrgTwSjtJY',
      },
      {
        title: 'Marni: The Story of Wewe Gombel',
        synopsis:
          'Keluarga kecil yang terdiri dari single mom dan dua orang anak pindah ke desa terpencil yang punya legenda lokal menyeramkan. Anisa, selalu melindungi adiknya Aan agar tidak diganggu makhluk halus yang suka menculik anak-anak di waktu maghrib. Nahas, Aan suatu hari menghilang dan ketika ditemukan ia berbeda dari biasanya. Sang ibu berusaha melindungi kedua anaknya semaksimal mungkin, namun teror makin menjadi-jadi.',
        genre: ['HOROR'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 5, 27, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 7, 27, 0, 0, 0, 0)),
        poster:
          'https://awsimages.detik.net.id/community/media/visual/2024/03/30/film-marni-the-story-of-wewe-gombel.jpeg?w=700&q=90',
        trailer: 'https://youtu.be/wqYzybqNAek',
      },
      {
        title: 'Akhir Kisah Cinta Si Doel',
        synopsis:
          'Kepulangan SARAH bersama DUL ke Jakarta, disambut bahagia oleh keluarga DOEL. Namun hal tersebut juga membuat ZAENAB, SARAH, dan DOEL dihadapkan pada pilihan besar. ZAENAB yang positif hamil dan masih trauma pernah kehilangan buah hati di masa lalu, kini harus memilih antara tetap berada di sisi DOEL, atau merelakannya demi menyatukan kembali sebuah keluarga.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2020, 0, 23, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2020, 2, 23, 0, 0, 0, 0)),
        poster:
          'https://id.wikipedia.org/wiki/Akhir_Kisah_Cinta_Si_Doel#/media/Berkas:Si_doel_3.jpg',
        trailer: 'https://youtu.be/Muo3owRBVt8?si=2gbVlub3XcDbLrIP',
      },
      {
        title: 'Nanti Kita Cerita tentang Hari Ini',
        synopsis:
          'Angkasa (Rio Dewanto), Aurora (Sheila Dara), dan Awan (Rachel Amanda) adalah kakak beradik yang hidup dalam keluarga yang tampak bahagia. Setelah mengalami kegagalan besar pertamanya, Awan berkenalan dengan Kale (Ardhito Pramono), seorang cowok eksentrik yang memberikan Awan pengalaman hidup baru, tentang patah, bangun, jatuh, tumbuh, hilang, dan semua ketakutan manusia pada umumnya. Perubahan sikap Awan mendapat tekanan dari orang tuanya. Hal tersebut mendorong pemberontakan ketiga kakak beradik ini yang menyebabkan terungkapnya rahasia dan trauma besar dalam keluarga mereka.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2020, 0, 9, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2020, 2, 9, 0, 0, 0, 0)),
        poster:
          'https://id.wikipedia.org/wiki/Nanti_Kita_Cerita_tentang_Hari_Ini_(film)#/media/Berkas:Nkcthi_poster.jpg',
        trailer: 'https://youtu.be/TcHh986XvI4?si=WdYt3hvgprI-UBzC',
      },
      {
        title: 'Anak Garuda',
        synopsis:
          'Julianto Eka Putra atau lebih dikenal sebagai Koh Jul, pendiri sekolah Selamat Pagi Indonesia bagi yatim-piatu tidak mampu, mengajak tujuh anak dengan latar belakang (suku, agama dan ras) berbeda–Sheren, Olfa, Wayan, Dilla, Sayyida, Yohana, dan Robet– untuk menjadi satu tim. Namun menyatukan mereka bukan persoalan sederhana. Pertengkaran dan keributan silih berganti, mulai dari sekedar salah paham hingga rasa iri. Belum lagi munculnya Rocky yang membuat hubungan mereka makin memanas. Rasa cemburu yang muncul karena cinta yang terpendam di antara mereka. Satu-satunya orang yang bisa merekatkan mereka adalah figur Koh Jul yang harus membenturkan kenyataan paling pahit pada mereka. Dia melepaskan ketujuh anak tersebut berangkat ke Eropa tanpa didampingi dirinya. Di Eropa, semua yang ditakutkan menjadi kenyataan. Pertengkaran dan keributan meledak.',
        genre: ['DRAMA'],
        rating: 0,
        totalReviews: 0,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2020, 0, 16, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2020, 2, 16, 0, 0, 0, 0)),
        poster:
          'https://m.media-amazon.com/images/M/MV5BMWE2YjNiYzMtMjkzNy00MzEwLWE0OTYtNzgzYmVjYTRlMGEyXkEyXkFqcGdeQXVyMTg4NzUxNjk@._V1_.jpg',
        trailer: 'https://youtu.be/6aY1DHzS8Tc?si=cdpD-D8JnqDii7dZ',
      },
    ],
  });

  console.log(films);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
