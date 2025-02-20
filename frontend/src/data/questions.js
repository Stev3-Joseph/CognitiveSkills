const questions = [
  {
    number: 1,
    question: "Which one of the following expressions is NOT correct?",
    options: ["17 ≥ 17", "17 ≥ 20", "17 ≥ 0", "17 ≥ -17"],
  },
  {
    number: 2,
    question: "What is 5/8 + 3/10?",
    options: ["49/80", "50/80", "37/40", "5/16"],
  },
  {
    number: 3,
    question:
      "A triangle has angles measuring 50° and 60°. What is the measure of the third angle?",
    options: ["70°", "80°", "90°", "100°"],
  },
  {
    number: 4,
    question:
      "A rectangle has a length of 8 cm and a width of 5 cm. What is its perimeter?",
    options: ["26 cm", "40 cm", "20 cm", "13 cm"],
  },
  {
    number: 5,
    question:
      "If a train travels at 60 km per hour, how far will it travel in 2 hours?",
    options: ["120 km", "100 km", "80 km", "60 km"],
  },
  {
    number: 6,
    question: "Solve for x: 5(x - 2) = 3x + 4",
    options: ["3", "5", "7", "8"],
  },
  {
    number: 7,
    question: "What is the remainder when 123 is divided by 11?",
    options: ["1", "2", "3", "4"],
  },
  {
    number: 8,
    question: "What is the next number in the sequence: 1, 3, 6, 10, __?",
    options: ["13", "15", "20", "25"],
  },
  {
    number: 9,
    question:
      "A shopkeeper sells a toy for ₹120, making a loss of 20%. What was the cost price?",
    options: ["₹100", "₹140", "₹150", "₹160"],
  },
  {
    number: 10,
    question:
      "If a cube has a volume of 64 cm³, what is the length of one side?",
    options: ["2 cm", "4 cm", "6 cm", "8 cm"],
  },
  {
    number: 11,
    question:
      "The sentence below has a word in which the letters are jumbled up. Rearrange the letters in capitals and write the correct version below it. EETPNRSS is a synonym of snakes.",
    options: ["SERPENTS", "PRESENTS", "REPENTSS", "PERTNESS"],
  },
  {
    number: 12,
    question: "He could not walk fast due to his NESSMALE.",
    options: ["LAMENESS", "SALESMAN", "MALENESS", "NAMELESS"],
  },
  {
    number: 13,
    question: "Which two words together can make a new, compound word?",
    options: ["book main", "book mark", "band mink", "brick mark"],
  },
  {
    number: 14,
    question: "FM is to TO as AP is to?",
    options: ["OM", "OP", "OR", "OW"],
  },
  {
    number: 15,
    question:
      "Find the three letters that have been removed from the word in capitals below. Her cousins lived on the OUTRTS of London.",
    options: ["SKI", "SKU", "SCI", "PAR"],
  },
  {
    number: 16,
    question: "Which group does STATIONERY belong in?",
    options: ["Group A", "Group B", "Group C", "Group D"],
  },
  {
    number: 17,
    question:
      "Find the group of letters that will continue the series in the most sensible way. SH PJ ML JN GP",
    options: ["SR", "MR", "DR", "OR"],
  },
  {
    number: 18,
    question:
      "Find the three letters that have been removed from the word in capitals below. His DESCANTS had originally come from India.",
    options: ["AND", "END", "ENT", "ANT"],
  },
  {
    number: 19,
    question:
      "Anxious is to (fretful thought restful) as loving is to (believe delighted kind).",
    options: [
      "thought kind",
      "thought believe",
      "fretful delighted",
      "fretful kind",
    ],
  },
  {
    number: 20,
    question: "The buses are kept overnight at the TPDOE.",
    options: ["DEPOT", "OPTED", "TOPED", "PODET"],
  },
  {
    number: 21,
    question:
      "Which one of the figures in the boxes on the right completes the analogy?",
    questionImage: "/section3/question1.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 22,
    question:
      "Which one of the figures in the boxes on the right is the missing figure?",
    questionImage: "/section3/question2.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 23,
    question:
      "Work out the code for the Figures 1, 2 and 3, and then decide which box (A, B, C or D) has the correct code for Figure 4",
    questionImage: "/section3/question3.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 24,
    question:
      "Which one of the figures in the boxes on the right is the missing figure?",
    questionImage: "/section3/question4.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 25,
    question:
      "The large square on the left of the page contains smaller squares that form a pattern. Choose one of the four shapes that will replace the question mark to complete the pattern.",
    questionImage: "/section3/question5.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 26,
    question:
      "Which one of the figures in the boxes on the right is the missing figure?",
    questionImage: "/section3/question6.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 27,
    question:
      "Which one of the figures in the boxes on the right is the missing figure?",
    questionImage: "/section3/question7.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 28,
    question:
      "Choose the alternative which is closely resembles the mirror image of the given combination.",
    questionImage: "/section3/question8.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 29,
    question:
      "How many dots lie opposite to the face having three dots, when the given figure is folded to form a cube?",
    questionImage: "/section3/question9.png",
    options: ["2", "4", "5", "6"],
  },
  {
    number: 30,
    question:
      "The large square on the left of the page contains smaller squares that form a pattern. Choose one of the four shapes that will replace the question mark to complete the pattern.",
    questionImage: "/section3/question10.png",
    options: ["A", "B", "C", "D"],
  },
  {
    number: 31,
    question: "Which of the following sentences is grammatically correct?",
    questionImage: "/section4/question.png",
    options: [
      "Aarav seen an old man carrying a bag.",
      "Aarav was seeing an old man carrying a bag.",
      "Aarav saw an old man carrying a bag.",
      "Aarav sees an old man carry a bag yesterday.",
    ],
  },
  {
    number: 32,
    question:
      "Identify the correct past tense form of the verb in the sentence: Aarav ___ (help) the old man with his bag.",
    questionImage: "/section4/question.png",
    options: ["help", "helped", "helping", "helps"],
  },
  {
    number: 33,
    question:
      "Which word is an adjective in this sentence? Aarav happily took the shiny coin.",
    questionImage: "/section4/question.png",
    options: ["took", "happily", "shiny", "coin"],
  },
  {
    number: 34,
    question: "What did Aarav do when he saw the old man?",
    questionImage: "/section4/question.png",
    options: [
      "Ignored him",
      "Helped him carry his bag",
      "Asked him for money",
      "Ran away",
    ],
  },
  {
    number: 35,
    question: "What special gift did the old man give Aarav?",
    questionImage: "/section4/question.png",
    options: ["A bag of gold", "A shiny coin", "A magic book", "A toy"],
  },
  {
    number: 36,
    question: "What happened to the coin when Aarav did good deeds?",
    questionImage: "/section4/question.png",
    options: [
      "It became dull",
      "It grew bigger",
      "It shined brighter",
      "It disappeared",
    ],
  },
  {
    number: 37,
    question:
      "What did the rich merchant offer Aarav in exchange for the coin?",
    questionImage: "/section4/question.png",
    options: [
      "A new house",
      "A bag full of gold",
      "A new school",
      "A magic lamp",
    ],
  },
  {
    number: 38,
    question: "Why did Aarav refuse the merchant’s offer?",
    questionImage: "/section4/question.png",
    options: [
      "He didn't like gold",
      "He wanted more money",
      "He believed kindness was more valuable",
      "He was afraid of the merchant",
    ],
  },
  {
    number: 39,
    question: "After meeting Aarav, what decision did the merchant make?",
    questionImage: "/section4/question.png",
    options: [
      "He reconsidered his offer",
      "He changed his perspective on generosity",
      "He chose to leave with a different mindset",
      "He thought about the value of wealth differently",
    ],
  },
  {
    number: 40,
    question: "The story teaches that:",
    questionImage: "/section4/question.png",
    options: [
      "Some actions lead to unexpected results",
      "Choices shape how we see value",
      "Rewards can be different for everyone",
      "What we hold onto matters more than what we receive",
    ],
  },
];

export default questions;
