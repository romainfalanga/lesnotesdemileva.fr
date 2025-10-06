interface Message {
  content: string;
  timestamp?: string;
}

interface Session {
  id: number;
  title: string;
  date: string;
  summary: string;
  messages: Message[];
}

export const sessions: Session[] = [
  {
    id: 1,
    title: "Première session : L'essence du temps",
    date: "15 janvier 2025",
    summary: "Une discussion fascinante sur la nature du temps et sa perception subjective. Albert a partagé ses réflexions sur la relativité du temps, tandis que Romain a posé des questions profondes sur notre expérience du présent.",
    messages: [
      {
        content: "Aujourd'hui, nous avons entamé une discussion passionnante sur la nature du temps. J'ai proposé que nous commencions par examiner notre expérience personnelle du temps avant d'aborder les concepts plus abstraits."
      },
      {
        content: "C'est une excellente approche, Mileva. Je pense que le temps n'est pas une entité absolue comme Newton le pensait. Notre perception du temps peut varier selon notre état d'esprit et nos circonstances."
      },
      {
        content: "Cela me fait réfléchir... Quand je suis concentré sur une tâche passionnante, le temps semble s'accélérer. Mais dans l'ennui, chaque minute traîne. Y a-t-il une explication scientifique à cela ?"
      },
      {
        content: "Excellente question, Romain ! La perception subjective du temps est effectivement liée à notre attention et à notre état émotionnel. Quand nous sommes engagés, notre cerveau traite moins d'informations sur le passage du temps lui-même."
      },
      {
        content: "Cette discussion m'amène à penser que peut-être le temps tel que nous le mesurons avec nos horloges n'est qu'une construction humaine pour organiser notre expérience. La réalité du temps pourrait être bien différente."
      }
    ]
  }
];

export type { Session, Message };