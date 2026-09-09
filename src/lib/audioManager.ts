// Unified Classical Audio Player for Your Lie in April Pieces

export interface YLIATrack {
  id: string;
  title: string;
  composer: string;
  pieceFull: string;
  yliaContext: string;
  duration: string;
  src: string;
}

export const YLIA_TRACKS: YLIATrack[] = [
  {
    id: "chopin-ballade-1",
    title: "Ballade No. 1 in G minor, Op. 23",
    composer: "Frédéric Chopin",
    pieceFull: "Frédéric Chopin: Ballade No. 1 in G minor, Op. 23",
    yliaContext: "Kousei's final competition solo with Kaori's spirit (Ep. 22)",
    duration: "11:19",
    src: "/audio/chopin-ballade-1.ogg",
  },
  {
    id: "beethoven-kreutzer",
    title: "Violin Sonata No. 9 'Kreutzer', Op. 47",
    composer: "Ludwig van Beethoven",
    pieceFull: "Beethoven: Violin Sonata No. 9 in A major, Op. 47 (Mov. 1)",
    yliaContext: "Kaori & Kousei's legendary first competition duet (Ep. 4)",
    duration: "11:45",
    src: "/audio/beethoven-kreutzer-sonata.ogg",
  },
  {
    id: "debussy-clair-de-lune",
    title: "Clair de Lune",
    composer: "Claude Debussy",
    pieceFull: "Claude Debussy: Suite bergamasque, L. 75 - III. Clair de lune",
    yliaContext: "Reflective moonlight on water, tender memories (Ep. 15)",
    duration: "05:03",
    src: "/audio/debussy-clair-de-lune.ogg",
  },
  {
    id: "chopin-etude-op10-4",
    title: "Étude in C-sharp minor, Op. 10, No. 4",
    composer: "Frédéric Chopin",
    pieceFull: "Frédéric Chopin: Étude in C-sharp minor, Op. 10, No. 4 ('Torrent')",
    yliaContext: "Kousei's frantic competition performance (Ep. 8)",
    duration: "02:08",
    src: "/audio/chopin-etude-op10-no4.ogg",
  },
  {
    id: "saintsaens-rondo",
    title: "Introduction and Rondo Capriccioso, Op. 28",
    composer: "Camille Saint-Saëns",
    pieceFull: "Camille Saint-Saëns: Introduction and Rondo Capriccioso in A minor, Op. 28",
    yliaContext: "Kaori's wild, free violin audition (Ep. 2)",
    duration: "09:22",
    src: "/audio/saintsaens-rondo-capriccioso.ogg",
  },
  {
    id: "chopin-etude-op25-5",
    title: "Étude in E minor, Op. 25, No. 5",
    composer: "Frédéric Chopin",
    pieceFull: "Frédéric Chopin: Étude in E minor, Op. 25, No. 5 ('Wrong Note')",
    yliaContext: "Kousei playing like a gentle breeze for Kaori (Ep. 11)",
    duration: "03:39",
    src: "/audio/chopin-etude-op25-no5.ogg",
  },
  {
    id: "bach-prelude-bwv848",
    title: "Well-Tempered Clavier, Prelude No. 3, BWV 848",
    composer: "Johann Sebastian Bach",
    pieceFull: "J.S. Bach: Prelude No. 3 in C-sharp major, BWV 848",
    yliaContext: "Kousei's disciplined preliminaries performance (Ep. 8)",
    duration: "01:21",
    src: "/audio/bach-prelude-bwv848.ogg",
  },
];
