// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.userFilmFavorites.deleteMany();
  await prisma.films.deleteMany();

  const films = await prisma.films.createMany({
    data: [
      {
        title: 'Yang Tak Tergantikan',
        synopsis:
          'Aryati seorang janda dengan pekerjaan sebagai driver online harus menghidupi ketiga anaknya. Ia harus menghadapi banyak tantangan untuk menjaga keluarganya tetap bersama.',
        genre: ['DRAMA', 'KELUARGA'],
        totalRating: 7.0,
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
        totalRating: 6.3,
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
        totalRating: 7.3,
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
        totalRating: 0.0,
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
        totalRating: 0.0,
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
        totalRating: 0.0,
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
        totalRating: 0.0,
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
        totalRating: 7.3,
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
        totalRating: 7.3,
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
        totalRating: 7.1,
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
        totalRating: 8.1,
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
        totalRating: 7.1,
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
        totalRating: 8.2,
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
        totalRating: 6.1,
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
        totalRating: 6.9,
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
        totalRating: 6.7,
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
        totalRating: 5.4,
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
        totalRating: 5.3,
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
        totalRating: 5.1,
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
        totalRating: 6.9,
        totalFavorites: 0,
        releaseDate: new Date(Date.UTC(2024, 1, 9, 0, 0, 0, 0)),
        finishDate: new Date(Date.UTC(2024, 3, 9, 0, 0, 0, 0)),
        poster:
          'https://akcdn.detik.net.id/community/media/visual/2023/02/14/gita-cinta-dari-sma_34.jpeg?w=375',
        trailer: 'https://www.youtube.com/watch?v=j92YfcwLacM',
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
