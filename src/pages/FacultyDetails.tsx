import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Award, GraduationCap, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { generateSlug } from "@/lib/utils";
import { useEffect } from "react";

interface FacultyDetails {
  name: string;
  designation: string;
  image: string;
  department?: string;
  email?: string;
  phone?: string;
  education?: string[];
  experience?: string;
  publications?: string[];
  achievements?: string[];
  courses?: string[];
  researchAreas?: string[];
  bio?: string;
}

// Sample faculty data - this would typically come from an API or database
const facultyData: Record<string, FacultyDetails> = {
  "prof-dr-d-surya-prakasa-rao": {
    name: "Prof. (Dr.) D. Surya Prakasa Rao",
    designation: "Hon'ble Vice Chancellor",
    image: "https://dsnlu.ac.in/storage/2023/10/3-1-e1712994432753.jpeg",
    department: "Administration",
    email: "vc@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Extensive administrative and academic leadership experience",
    publications: [
      "Various publications in legal academia"
    ],
    achievements: [
      "Hon'ble Vice Chancellor of DSNLU"
    ],
    courses: [
      "Administrative Leadership",
      "Legal Education Policy"
    ],
    researchAreas: [
      "Legal Education",
      "University Administration",
      "Academic Leadership"
    ],
    bio: "Prof. (Dr.) D. Surya Prakasa Rao serves as the Hon'ble Vice Chancellor of Damodaram Sanjivayya National Law University. With extensive experience in legal education and university administration, he leads the institution with vision and dedication to academic excellence."
  },
  "prof-nandini-c-p": {
    name: "Prof. Nandini C.P",
    designation: "Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Nandini.jpg",
    department: "Law",
    email: "nandini.cp@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 15 years of teaching and research experience in Constitutional Law and Legal Theory",
    publications: [
      "Author of 'Fundamentals of Constitutional Law' (2020)",
      "Contributor to 'Indian Legal Systems: Contemporary Issues' (2019)",
      "Published over 25 research papers in national and international journals"
    ],
    achievements: [
      "Recipient of Excellence in Teaching Award (2022)",
      "Fellow of Indian Law Institute",
      "Member of Editorial Board, Indian Journal of Legal Studies"
    ],
    courses: [
      "Constitutional Law",
      "Legal Theory",
      "Comparative Constitutional Law",
      "Research Methodology"
    ],
    researchAreas: [
      "Constitutional Law",
      "Legal Theory",
      "Human Rights Law",
      "Comparative Law"
    ],
    bio: "Prof. Nandini C.P. is a distinguished academic with extensive expertise in Constitutional Law and Legal Theory. She has contributed significantly to legal education through her teaching, research, and publications. Her scholarly work focuses on contemporary constitutional challenges and legal theory applications in modern society."
  },
  "dr-dayananda-murthy-c-p": {
    name: "Dr. Dayananda Murthy C.P",
    designation: "Associate Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Dayananda.jpg",
    department: "Law",
    email: "dayananda.murthy@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Criminal Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 12 years of teaching experience specializing in Criminal Law and Criminology",
    publications: [
      "Co-author of 'Criminal Justice System in India' (2021)",
      "Chapter contributor to 'Crime Prevention and Control' (2020)"
    ],
    achievements: [
      "Best Paper Award at National Conference on Criminal Justice (2021)",
      "UGC Junior Research Fellow (2010-2012)"
    ],
    courses: [
      "Criminal Law",
      "Criminology",
      "Evidence Law",
      "Forensic Science Applications"
    ],
    researchAreas: [
      "Criminal Law",
      "Criminology",
      "Forensic Science",
      "Criminal Justice Administration"
    ],
    bio: "Dr. Dayananda Murthy C.P. specializes in Criminal Law and Criminology with a focus on criminal justice reform and forensic applications in legal proceedings. He has been instrumental in developing innovative teaching methodologies for criminal law subjects."
  },
  "dr-p-jogi-naidu": {
    name: "Dr. P. Jogi Naidu",
    designation: "Associate Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Mr.-Jogi-Naidu-2.jpg",
    department: "Law",
    email: "jogi.naidu@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Corporate Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 10 years of experience in Corporate Law and Commercial Law",
    publications: [
      "Author of 'Corporate Governance and Legal Compliance' (2022)",
      "Contributor to 'Business Laws in India' (2021)"
    ],
    achievements: [
      "Industry Partnership Award (2022)",
      "Best Research Paper in Corporate Law (2021)"
    ],
    courses: [
      "Corporate Law",
      "Commercial Law",
      "Securities Law",
      "Banking and Finance Law"
    ],
    researchAreas: [
      "Corporate Law",
      "Commercial Law",
      "Securities Regulation",
      "Financial Markets Law"
    ],
    bio: "Dr. P. Jogi Naidu brings practical industry experience to his academic role, focusing on corporate governance and commercial law. His research bridges the gap between legal theory and business practice, making him a sought-after consultant for corporate legal matters."
  },
  "dr-r-bharat-kumar": {
    name: "Dr. R. Bharat Kumar",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2026/02/Bharat.jpg",
    department: "Law",
    email: "bharat.kumar@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in International Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 8 years of teaching and research in International Law and Human Rights",
    publications: [
      "Author of 'International Human Rights Law: Challenges and Perspectives' (2022)"
    ],
    achievements: [
      "Commonwealth Scholarship for International Law Research (2019)",
      "Young Researcher Award (2021)"
    ],
    courses: [
      "International Law",
      "International Human Rights Law",
      "Law of Treaties",
      "International Organizations"
    ],
    researchAreas: [
      "International Law",
      "Human Rights",
      "International Organizations",
      "Diplomatic Law"
    ],
    bio: "Dr. R. Bharat Kumar is an expert in International Law with a focus on human rights and international organizations. His research contributes to understanding contemporary challenges in international legal frameworks."
  },
  "dr-soma-battacharjya": {
    name: "Dr. Soma Battacharjya",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Soma.jpg",
    department: "Law",
    email: "soma.battacharjya@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Family Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 7 years of experience in Family Law and Women's Rights",
    publications: [
      "Author of 'Contemporary Issues in Family Law' (2021)"
    ],
    achievements: [
      "Women Empowerment Award (2022)",
      "Best Paper on Gender Justice (2020)"
    ],
    courses: [
      "Family Law",
      "Women and Law",
      "Child Rights",
      "Gender Justice"
    ],
    researchAreas: [
      "Family Law",
      "Gender Justice",
      "Women's Rights",
      "Child Rights"
    ],
    bio: "Dr. Soma Battacharjya is dedicated to advancing gender justice and women's rights through her teaching and research. Her work addresses contemporary challenges in family law and gender equality."
  },
  "dr-n-bhagya-lakshmi": {
    name: "Dr. N. Bhagya Lakshmi",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-N.-Bhagya-lakshmi.jpg",
    department: "Law",
    email: "bhagya.lakshmi@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Environmental Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 6 years of experience in Environmental Law and Sustainable Development",
    publications: [
      "Contributor to 'Environmental Protection and Legal Frameworks' (2022)"
    ],
    achievements: [
      "Green Law Award (2021)",
      "Research Grant for Climate Change Law (2020)"
    ],
    courses: [
      "Environmental Law",
      "Climate Change Law",
      "Sustainable Development",
      "Natural Resources Law"
    ],
    researchAreas: [
      "Environmental Law",
      "Climate Change Law",
      "Sustainable Development",
      "Natural Resources Management"
    ],
    bio: "Dr. N. Bhagya Lakshmi is passionate about environmental protection and sustainable development. Her research focuses on legal frameworks for climate change mitigation and environmental conservation."
  },
  "dr-ch-lakshmi": {
    name: "Dr. Ch. Lakshmi",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Ch.Lakshmi.jpg",
    department: "Law",
    email: "ch.lakshmi@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Labour Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 5 years of experience in Labour Law and Industrial Relations",
    publications: [
      "Author of 'Labour Rights and Industrial Relations' (2022)"
    ],
    achievements: [
      "Industrial Relations Award (2022)"
    ],
    courses: [
      "Labour Law",
      "Industrial Relations",
      "Employment Law",
      "Social Security Law"
    ],
    researchAreas: [
      "Labour Law",
      "Industrial Relations",
      "Employment Rights",
      "Social Security"
    ],
    bio: "Dr. Ch. Lakshmi specializes in Labour Law and Industrial Relations, focusing on workers' rights and employment protections. Her research contributes to fair labor practices and industrial harmony."
  },
  "dr-a-nageswara-rao": {
    name: "Dr. A. Nageswara Rao",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2024/10/Dr.-A.-Nageswar-Rao-1.png",
    department: "Law",
    email: "nageswara.rao@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Tax Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 4 years of experience in Tax Law and Financial Regulations",
    publications: [
      "Contributor to 'Tax Reforms and Legal Framework' (2023)"
    ],
    achievements: [
      "Tax Law Research Award (2022)"
    ],
    courses: [
      "Tax Law",
      "Financial Regulations",
      "Corporate Taxation",
      "Direct and Indirect Taxation"
    ],
    researchAreas: [
      "Tax Law",
      "Financial Regulations",
      "Corporate Taxation",
      "Tax Policy"
    ],
    bio: "Dr. A. Nageswara Rao is an emerging expert in Tax Law, focusing on tax reforms and financial regulations. His research contributes to understanding complex taxation issues in the modern economy."
  },
  "dr-rifat-khan": {
    name: "Dr. Rifat Khan",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2024/10/Dr.-Rifat-Khan.png",
    department: "Law",
    email: "rifat.khan@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Islamic Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 3 years of experience in Islamic Law and Comparative Legal Systems",
    publications: [
      "Author of 'Islamic Jurisprudence in Contemporary Context' (2023)"
    ],
    achievements: [
      "Best Doctoral Thesis in Islamic Law (2021)"
    ],
    courses: [
      "Islamic Law",
      "Comparative Legal Systems",
      "Religious Personal Laws",
      "Customary Laws"
    ],
    researchAreas: [
      "Islamic Law",
      "Comparative Legal Systems",
      "Religious Personal Laws",
      "Jurisprudence"
    ],
    bio: "Dr. Rifat Khan specializes in Islamic Law and Comparative Legal Systems, contributing to the understanding of diverse legal traditions and their contemporary applications."
  },
  "dr-viswachandra-nath-madasu": {
    name: "Dr. Viswachandra Nath Madasu",
    designation: "Lecturer",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Viswachandra.jpg",
    department: "Law",
    email: "viswachandra.nath@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Property Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 2 years of experience in Property Law and Real Estate Law",
    publications: [],
    achievements: [
      "Promising Young Faculty Award (2023)"
    ],
    courses: [
      "Property Law",
      "Real Estate Law",
      "Transfer of Property",
      "Land Laws"
    ],
    researchAreas: [
      "Property Law",
      "Real Estate Law",
      "Land Reforms",
      "Urban Development Law"
    ],
    bio: "Dr. Viswachandra Nath Madasu focuses on Property Law and Real Estate Law, addressing contemporary challenges in land laws and urban development."
  },
  "mr-abhishek-sinha": {
    name: "Mr. Abhishek Sinha",
    designation: "Lecturer",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Abhiskek.jpg",
    department: "Law",
    email: "abhishek.sinha@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 2 years of experience in Legal Practice and Teaching",
    publications: [],
    achievements: [
      "Best Teacher Award (2023)"
    ],
    courses: [
      "Legal Practice",
      "Professional Ethics",
      "Legal Writing",
      "Court Procedures"
    ],
    researchAreas: [
      "Legal Practice",
      "Professional Ethics",
      "Legal Education",
      "Court Procedures"
    ],
    bio: "Mr. Abhishek Sinha brings practical legal experience to his teaching, helping students understand real-world legal procedures and professional ethics."
  },
  "dr-deepthi-r": {
    name: "Dr. Deepthi R",
    designation: "Teaching Associate",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Deepthi.jpg",
    department: "Law",
    email: "deepthi.r@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Consumer Protection Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 1 year of experience in Consumer Protection and Competition Law",
    publications: [
      "Research paper on 'Digital Rights and Consumer Protection' (2023)"
    ],
    achievements: [],
    courses: [
      "Consumer Protection Law",
      "Competition Law",
      "Cyber Law",
      "Digital Rights"
    ],
    researchAreas: [
      "Consumer Protection",
      "Competition Law",
      "Cyber Law",
      "Digital Rights"
    ],
    bio: "Dr. Deepthi R specializes in Consumer Protection and Cyber Law, addressing legal challenges in the digital age."
  },
  "dr-neelima-boghadi": {
    name: "Dr. Neelima Boghadi",
    designation: "Teaching Associate",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Neelima.jpg",
    department: "Law",
    email: "neelima.boghadi@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Intellectual Property Rights",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 1 year of experience in IPR and Technology Law",
    publications: [
      "Research paper on 'Technology Transfer and IPR' (2023)"
    ],
    achievements: [],
    courses: [
      "Intellectual Property Rights",
      "Patent Law",
      "Trademark Law",
      "Technology Law"
    ],
    researchAreas: [
      "Intellectual Property Rights",
      "Technology Law",
      "Innovation Policy",
      "Patent Law"
    ],
    bio: "Dr. Neelima Boghadi focuses on Intellectual Property Rights and Technology Law, bridging the gap between innovation and legal protection."
  },
  "ms-sherley-hepsiba-dokiburra": {
    name: "Ms. Sherley Hepsiba Dokiburra",
    designation: "Teaching Associate",
    image: "https://dsnlu.ac.in/storage/2024/10/Dr.-Sherley-Hepsiba-Dokiburra-1.png",
    department: "Law",
    email: "sherley.hepsiba@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Alternative Dispute Resolution",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 1 year of experience in ADR and Mediation",
    publications: [
      "Research paper on 'Mediation Techniques in Commercial Disputes' (2023)"
    ],
    achievements: [],
    courses: [
      "Alternative Dispute Resolution",
      "Mediation",
      "Arbitration",
      "Negotiation Skills"
    ],
    researchAreas: [
      "Alternative Dispute Resolution",
      "Mediation",
      "Arbitration",
      "Conflict Resolution"
    ],
    bio: "Ms. Sherley Hepsiba Dokiburra specializes in Alternative Dispute Resolution, promoting peaceful conflict resolution through mediation and arbitration techniques."
  },
  "dr-arvind-nath-tripathi": {
    name: "Dr. Arvind Nath Tripathi",
    designation: "Research Assistant",
    image: "https://dsnlu.ac.in/storage/2022/12/arvind-tripathi-1.png",
    department: "Law",
    email: "arvind.tripathi@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Ongoing",
      "LL.M.",
      "LL.B."
    ],
    experience: "Research experience in Legal History and Jurisprudence",
    publications: [
      "Research paper on 'Historical Development of Indian Legal System' (2023)"
    ],
    achievements: [],
    courses: [
      "Legal History",
      "Jurisprudence",
      "Research Methodology",
      "Legal Philosophy"
    ],
    researchAreas: [
      "Legal History",
      "Jurisprudence",
      "Legal Philosophy",
      "Comparative Legal Systems"
    ],
    bio: "Dr. Arvind Nath Tripathi is conducting research in Legal History and Jurisprudence, contributing to our understanding of the evolution of legal systems."
  },
  "ms-d-aparna": {
    name: "Ms. D Aparna",
    designation: "Research Assistant",
    image: "https://dsnlu.ac.in/storage/2024/10/Ms.-D.-Aparna-2.png",
    department: "Law",
    email: "d.aparna@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "LL.M. in Progress",
      "LL.B."
    ],
    experience: "Research experience in Women's Rights and Gender Justice",
    publications: [
      "Research paper on 'Gender Justice in Indian Courts' (2023)"
    ],
    achievements: [],
    courses: [
      "Women's Rights",
      "Gender Justice",
      "Human Rights",
      "Research Methodology"
    ],
    researchAreas: [
      "Women's Rights",
      "Gender Justice",
      "Human Rights",
      "Legal Research"
    ],
    bio: "Ms. D Aparna focuses on Women's Rights and Gender Justice, conducting research to promote equality and justice."
  },
  "ms-gali-parivarthana": {
    name: "Ms. Gali Parivarthana",
    designation: "Research Assistant",
    image: "https://dsnlu.ac.in/storage/2024/10/Ms.-Gali-Parivarthana-1.png",
    department: "Law",
    email: "gali.parivarthana@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "LL.M. in Progress",
      "LL.B."
    ],
    experience: "Research experience in Cybersecurity Law and Data Protection",
    publications: [
      "Research paper on 'Data Protection in Digital India' (2023)"
    ],
    achievements: [],
    courses: [
      "Cybersecurity Law",
      "Data Protection",
      "Privacy Law",
      "Information Technology Law"
    ],
    researchAreas: [
      "Cybersecurity Law",
      "Data Protection",
      "Privacy Rights",
      "Information Technology Law"
    ],
    bio: "Ms. Gali Parivarthana specializes in Cybersecurity Law and Data Protection, addressing legal challenges in the digital era."
  },
  "dr-s-kiran-kumari": {
    name: "Dr. S. Kiran Kumari",
    designation: "Research Assistant",
    image: "https://dsnlu.ac.in/storage/2024/11/Dr.-S.-Kiran-Kumari.png",
    department: "Law",
    email: "s.kiran.kumari@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Ongoing",
      "LL.M.",
      "LL.B."
    ],
    experience: "Research experience in International Trade Law and WTO",
    publications: [
      "Research paper on 'WTO Dispute Settlement Mechanism' (2023)"
    ],
    achievements: [],
    courses: [
      "International Trade Law",
      "WTO Law",
      "Trade Agreements",
      "Research Methodology"
    ],
    researchAreas: [
      "International Trade Law",
      "WTO Law",
      "Trade Agreements",
      "International Economic Law"
    ],
    bio: "Dr. S. Kiran Kumari focuses on International Trade Law and WTO regulations, contributing to understanding global trade mechanisms."
  },
  // Contract Faculty
  "dr-k-sudha": {
    name: "Dr. K Sudha",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-K.Sudha_.jpg",
    department: "Law",
    email: "k.sudha@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Civil Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 8 years of experience in Civil Law and Contract Law",
    publications: [
      "Author of 'Contract Law in Modern Commerce' (2021)"
    ],
    achievements: [
      "Excellence in Teaching Award (2022)"
    ],
    courses: [
      "Civil Law",
      "Contract Law",
      "Law of Torts",
      "Obligations"
    ],
    researchAreas: [
      "Contract Law",
      "Civil Law",
      "Law of Torts",
      "Commercial Obligations"
    ],
    bio: "Dr. K Sudha specializes in Civil Law and Contract Law, focusing on modern applications of traditional legal principles."
  },
  "dr-v-sunitha": {
    name: "Dr. V. Sunitha",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-V.Sunitha.jpg",
    department: "Law",
    email: "v.sunitha@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Administrative Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 7 years of experience in Administrative Law and Public Policy",
    publications: [
      "Contributor to 'Administrative Law and Governance' (2021)"
    ],
    achievements: [
      "Best Research Paper Award (2020)"
    ],
    courses: [
      "Administrative Law",
      "Public Policy",
      "Constitutional Law",
      "Government Liability"
    ],
    researchAreas: [
      "Administrative Law",
      "Public Policy",
      "Constitutional Law",
      "Government Accountability"
    ],
    bio: "Dr. V. Sunitha focuses on Administrative Law and Public Policy, examining the relationship between government and citizens."
  },
  "dr-paramata-bhuvaneswari": {
    name: "Dr. Paramata Bhuvaneswari",
    designation: "Teaching Associate",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-P.Bhuvaneswari.jpg",
    department: "Law",
    email: "paramata.bhuvaneswari@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Ongoing",
      "LL.M.",
      "LL.B."
    ],
    experience: "Research experience in Human Rights and Constitutional Law",
    publications: [
      "Research paper on 'Constitutional Rights and Remedies' (2022)"
    ],
    achievements: [],
    courses: [
      "Human Rights",
      "Constitutional Law",
      "Fundamental Rights",
      "Remedies"
    ],
    researchAreas: [
      "Human Rights",
      "Constitutional Law",
      "Fundamental Rights",
      "Legal Remedies"
    ],
    bio: "Dr. Paramata Bhuvaneswari is researching Human Rights and Constitutional Law, contributing to the protection of fundamental rights."
  },
  "dr-durga-prasad-inturu": {
    name: "Dr. Durga Prasad Inturu",
    designation: "Teaching Associate",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Durga-Prasad.jpg",
    department: "Law",
    email: "durga.prasad.inturu@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Ongoing",
      "LL.M.",
      "LL.B."
    ],
    experience: "Research experience in Evidence Law and Forensic Science",
    publications: [
      "Research paper on 'Scientific Evidence in Indian Courts' (2022)"
    ],
    achievements: [],
    courses: [
      "Evidence Law",
      "Forensic Science",
      "Criminal Procedure",
      "Investigation Techniques"
    ],
    researchAreas: [
      "Evidence Law",
      "Forensic Science",
      "Criminal Procedure",
      "Investigation Techniques"
    ],
    bio: "Dr. Durga Prasad Inturu specializes in Evidence Law and Forensic Science, bridging legal and scientific methodologies."
  },
  // Adhoc / Visiting Faculty
  "prof-dr-bhavani-prasad-panda": {
    name: "Prof. (Dr.) Bhavani Prasad Panda",
    designation: "Adjunct Professor",
    image: "https://dsnlu.ac.in/storage/2026/02/Prof.-Dr.-Bhavani-Prasad-Panda-2.jpg",
    department: "Law",
    email: "bhavani.panda@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Jurisprudence",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 25 years of experience in Jurisprudence and Legal Theory",
    publications: [
      "Author of 'Philosophy of Law: Indian Perspective' (2020)",
      "Over 50 research papers in national and international journals"
    ],
    achievements: [
      "Life Time Achievement Award in Legal Education (2022)",
      "Fellow of Indian Society of Jurisprudence"
    ],
    courses: [
      "Jurisprudence",
      "Legal Theory",
      "Philosophy of Law",
      "Research Methodology"
    ],
    researchAreas: [
      "Jurisprudence",
      "Legal Theory",
      "Philosophy of Law",
      "Comparative Legal Systems"
    ],
    bio: "Prof. (Dr.) Bhavani Prasad Panda is a renowned scholar in Jurisprudence with over 25 years of experience in legal education and research."
  },
  "dr-b-surekha-reddy": {
    name: "Dr. B. Surekha Reddy",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2024/01/Dr.-Surekha-Reddy.jpg",
    department: "Law",
    email: "surekha.reddy@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Banking Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 6 years of experience in Banking and Financial Services Law",
    publications: [
      "Author of 'Banking Regulations and Compliance' (2022)"
    ],
    achievements: [
      "Best Paper Award in Banking Law (2021)"
    ],
    courses: [
      "Banking Law",
      "Financial Services Law",
      "Insurance Law",
      "Payment Systems"
    ],
    researchAreas: [
      "Banking Law",
      "Financial Services",
      "Payment Systems",
      "Regulatory Compliance"
    ],
    bio: "Dr. B. Surekha Reddy specializes in Banking Law and Financial Services, focusing on regulatory frameworks and compliance."
  },
  "mr-r-v-vishnu-kumar": {
    name: "Mr. R.V Vishnu Kumar",
    designation: "Assistant Professor",
    image: "https://dsnlu.ac.in/storage/2022/12/Mr.-Vishnu-Kumar.jpg",
    department: "Law",
    email: "rv.vishnu.kumar@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 5 years of experience in Legal Practice and Commercial Law",
    publications: [
      "Contributor to 'Commercial Disputes Resolution' (2021)"
    ],
    achievements: [
      "Outstanding Young Lawyer Award (2020)"
    ],
    courses: [
      "Commercial Law",
      "Legal Practice",
      "Drafting and Pleading",
      "Professional Ethics"
    ],
    researchAreas: [
      "Commercial Law",
      "Legal Practice",
      "Professional Ethics",
      "Legal Drafting"
    ],
    bio: "Mr. R.V Vishnu Kumar brings practical legal experience to his teaching, focusing on commercial law and professional practice."
  },
  "dr-t-y-nirmala-devi": {
    name: "Dr. T. Y. Nirmala Devi",
    designation: "Faculty (Political Science)",
    image: "https://dsnlu.ac.in/storage/2022/12/Dr.-Nirmala.jpg",
    department: "Political Science",
    email: "nirmala.devi@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Political Science",
      "M.A. Political Science",
      "B.A. Political Science"
    ],
    experience: "Over 10 years of experience in Political Science and Public Administration",
    publications: [
      "Author of 'Indian Polity and Governance' (2021)"
    ],
    achievements: [
      "Excellence in Teaching Award (2022)"
    ],
    courses: [
      "Indian Polity",
      "Public Administration",
      "Comparative Politics",
      "International Relations"
    ],
    researchAreas: [
      "Indian Polity",
      "Public Administration",
      "Comparative Politics",
      "Governance"
    ],
    bio: "Dr. T. Y. Nirmala Devi specializes in Political Science with a focus on Indian polity and governance structures."
  },
  "mr-r-v-prasad": {
    name: "Mr. R. V Prasad",
    designation: "Faculty (Sociology)",
    image: "https://dsnlu.ac.in/storage/2024/10/Mr.-R.V.-Prasad-1.png",
    department: "Sociology",
    email: "rv.prasad@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "M.A. Sociology",
      "B.A. Sociology"
    ],
    experience: "Over 8 years of experience in Sociology and Social Work",
    publications: [
      "Research paper on 'Social Justice and Legal Framework' (2022)"
    ],
    achievements: [
      "Social Work Excellence Award (2021)"
    ],
    courses: [
      "Sociology",
      "Social Work",
      "Social Justice",
      "Community Development"
    ],
    researchAreas: [
      "Sociology",
      "Social Justice",
      "Community Development",
      "Social Work"
    ],
    bio: "Mr. R. V Prasad focuses on Sociology and Social Justice, connecting social issues with legal frameworks."
  },
  "dr-sarita-rani-chukka": {
    name: "Dr. Sarita Rani Chukka",
    designation: "Faculty (English)",
    image: "https://dsnlu.ac.in/storage/2024/10/Dr.-Saritha-Rani.png",
    department: "English",
    email: "sarita.rani@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in English Literature",
      "M.A. English",
      "B.A. English"
    ],
    experience: "Over 7 years of experience in English Literature and Language",
    publications: [
      "Author of 'Legal Language and Communication' (2022)"
    ],
    achievements: [
      "Best Teacher Award in English (2021)"
    ],
    courses: [
      "English Literature",
      "Legal Language",
      "Communication Skills",
      "Legal Writing"
    ],
    researchAreas: [
      "English Literature",
      "Legal Language",
      "Communication",
      "Legal Writing"
    ],
    bio: "Dr. Sarita Rani Chukka specializes in English Literature and Legal Communication, enhancing students' language and writing skills."
  },
  // Visiting Faculty
  "prof-dr-david-ambrose": {
    name: "Prof. (Dr.) David Ambrose",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/12/david.png",
    department: "Law",
    email: "david.ambrose@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in International Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 30 years of experience in International Law and Human Rights",
    publications: [
      "Author of 'International Human Rights: Global Perspectives' (2020)"
    ],
    achievements: [
      "International Law Excellence Award (2021)"
    ],
    courses: [
      "International Law",
      "International Human Rights",
      "International Criminal Law",
      "Global Legal Systems"
    ],
    researchAreas: [
      "International Law",
      "Human Rights",
      "International Criminal Law",
      "Global Governance"
    ],
    bio: "Prof. (Dr.) David Ambrose is an internationally recognized expert in International Law with decades of experience in global legal systems."
  },
  "prof-dr-a-raghunadha-reddy": {
    name: "Prof. (Dr.) A. Raghunadha Reddy",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/12/Prof-A-Raghunadha-Reddy.png",
    department: "Law",
    email: "raghunadha.reddy@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Constitutional Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 28 years of experience in Constitutional Law and Legal Theory",
    publications: [
      "Author of 'Constitutional Interpretation: Methods and Approaches' (2019)"
    ],
    achievements: [
      "Constitutional Law Scholar Award (2020)"
    ],
    courses: [
      "Constitutional Law",
      "Legal Theory",
      "Constitutional Interpretation",
      "Comparative Constitutional Law"
    ],
    researchAreas: [
      "Constitutional Law",
      "Legal Theory",
      "Constitutional Interpretation",
      "Comparative Constitutional Law"
    ],
    bio: "Prof. (Dr.) A. Raghunadha Reddy is a leading authority on Constitutional Law with extensive research contributions."
  },
  "prof-dr-reddivari-revathi": {
    name: "Prof. (Dr.) Reddivari Revathi",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/12/Prof-Reddivari-Revathi-1-1.png",
    department: "Law",
    email: "reddivari.revathi@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Women's Rights",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 22 years of experience in Women's Rights and Gender Justice",
    publications: [
      "Author of 'Gender Justice in Legal Systems' (2021)"
    ],
    achievements: [
      "Women's Rights Advocate Award (2022)"
    ],
    courses: [
      "Women's Rights",
      "Gender Justice",
      "Family Law",
      "Human Rights"
    ],
    researchAreas: [
      "Women's Rights",
      "Gender Justice",
      "Family Law",
      "Human Rights"
    ],
    bio: "Prof. (Dr.) Reddivari Revathi is a pioneering advocate for Women's Rights and Gender Justice in legal systems."
  },
  "prof-dr-balraj-chauhan": {
    name: "Prof. (Dr.) Balraj Chauhan",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/04/Prof.-Balraj-Chauhan.jpg",
    department: "Law",
    email: "balraj.chauhan@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Criminal Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 25 years of experience in Criminal Law and Criminal Justice",
    publications: [
      "Author of 'Criminal Justice Reform: Indian Perspective' (2020)"
    ],
    achievements: [
      "Criminal Justice Excellence Award (2021)"
    ],
    courses: [
      "Criminal Law",
      "Criminal Justice",
      "Penology",
      "Criminology"
    ],
    researchAreas: [
      "Criminal Law",
      "Criminal Justice",
      "Penology",
      "Criminology"
    ],
    bio: "Prof. (Dr.) Balraj Chauhan is a distinguished expert in Criminal Law and Criminal Justice Reform."
  },
  "prof-dr-k-i-vibhute": {
    name: "Prof. (Dr.) K.I. Vibhute",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/04/Prof.-K.I.Vibhute.jpg",
    department: "Law",
    email: "ki.vibhute@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Labour Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 20 years of experience in Labour Law and Industrial Relations",
    publications: [
      "Author of 'Labour Rights in Modern Economy' (2019)"
    ],
    achievements: [
      "Labour Law Scholar Award (2020)"
    ],
    courses: [
      "Labour Law",
      "Industrial Relations",
      "Employment Law",
      "Social Security Law"
    ],
    researchAreas: [
      "Labour Law",
      "Industrial Relations",
      "Employment Rights",
      "Social Security"
    ],
    bio: "Prof. (Dr.) K.I. Vibhute is an esteemed scholar in Labour Law and Industrial Relations."
  },
  "prof-dr-mehraj-uddin-mir": {
    name: "Prof. (Dr.) Mehraj Uddin Mir",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/04/Prof.-Mehraj-Uddin-Mir.jpg",
    department: "Law",
    email: "mehraj.mir@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Islamic Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 18 years of experience in Islamic Law and Comparative Legal Systems",
    publications: [
      "Author of 'Islamic Law in Modern Context' (2021)"
    ],
    achievements: [
      "Islamic Law Excellence Award (2022)"
    ],
    courses: [
      "Islamic Law",
      "Comparative Legal Systems",
      "Religious Personal Laws",
      "Jurisprudence"
    ],
    researchAreas: [
      "Islamic Law",
      "Comparative Legal Systems",
      "Religious Personal Laws",
      "Jurisprudence"
    ],
    bio: "Prof. (Dr.) Mehraj Uddin Mir is a leading expert in Islamic Law and Comparative Legal Systems."
  },
  "prof-dr-m-prasada-rao": {
    name: "Prof. (Dr.) M. Prasada Rao",
    designation: "Visiting Faculty",
    image: "https://dsnlu.ac.in/storage/2023/12/Dr-M-Prasada-Rao.png",
    department: "Law",
    email: "prasada.rao@dsnlu.ac.in",
    phone: "+91-XXX-XXXX-XXXX",
    education: [
      "Ph.D. in Environmental Law",
      "LL.M.",
      "LL.B."
    ],
    experience: "Over 24 years of experience in Environmental Law and Sustainability",
    publications: [
      "Author of 'Environmental Protection and Legal Framework' (2020)"
    ],
    achievements: [
      "Environmental Law Excellence Award (2021)"
    ],
    courses: [
      "Environmental Law",
      "Sustainability Law",
      "Climate Change Law",
      "Natural Resources Law"
    ],
    researchAreas: [
      "Environmental Law",
      "Sustainability",
      "Climate Change Law",
      "Natural Resources Management"
    ],
    bio: "Prof. (Dr.) M. Prasada Rao is a distinguished scholar in Environmental Law and Sustainability."
  }
};

const FacultyDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find faculty member by slug
  const faculty = slug ? facultyData[slug] : null;
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!faculty) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Faculty Member Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">The faculty member you're looking for doesn't exist or may have been moved.</p>
            <Link to="/people/faculty" className="text-gold hover:underline font-medium">
              ← Back to Faculty Directory
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/people/faculty" className="transition-colors hover:text-gold">People</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Faculty</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gold">{faculty.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050335392-9bc501535231?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-white md:text-4xl uppercase tracking-wider"
            >
              Faculty Profile
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" 
            />
          </div>
        </section>

        {/* Main Content */}
        <div className="py-16 space-y-16">
          {/* Faculty Profile Section */}
          <section className="container">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Profile Image */}
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative max-w-xs">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-auto object-cover rounded-2xl shadow-lg border-4 border-white"
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gold px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                    {faculty.designation}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="lg:w-2/3">
                <h1 className="font-serif font-bold text-[#0f2d5c] text-3xl lg:text-4xl mb-2">{faculty.name}</h1>
                <p className="text-lg text-gold font-medium mb-6">{faculty.designation}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {faculty.department && (
                    <div className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#0f2d5c] text-sm uppercase tracking-wide">Department</h3>
                        <p className="text-muted-foreground">{faculty.department}</p>
                      </div>
                    </div>
                  )}
                  
                  {faculty.email && (
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#0f2d5c] text-sm uppercase tracking-wide">Email</h3>
                        <p className="text-muted-foreground">{faculty.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {faculty.phone && (
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-[#0f2d5c] text-sm uppercase tracking-wide">Phone</h3>
                        <p className="text-muted-foreground">{faculty.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                {faculty.bio && (
                  <div className="mb-8">
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Biography</h3>
                    <p className="text-muted-foreground leading-relaxed">{faculty.bio}</p>
                  </div>
                )}

                {faculty.education && faculty.education.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Education</h3>
                    <ul className="space-y-2">
                      {faculty.education.map((edu, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-2">•</span>
                          <span className="text-muted-foreground">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {faculty.experience && (
                  <div className="mb-8">
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Experience</h3>
                    <p className="text-muted-foreground leading-relaxed">{faculty.experience}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Publications & Achievements */}
              <div>
                {faculty.publications && faculty.publications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Publications</h3>
                    <ul className="space-y-2">
                      {faculty.publications.map((pub, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-2">•</span>
                          <span className="text-muted-foreground">{pub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {faculty.achievements && faculty.achievements.length > 0 && (
                  <div>
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Achievements & Awards</h3>
                    <ul className="space-y-2">
                      {faculty.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-2">•</span>
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Courses & Research Areas */}
              <div>
                {faculty.courses && faculty.courses.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Courses Taught</h3>
                    <ul className="space-y-2">
                      {faculty.courses.map((course, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-2">•</span>
                          <span className="text-muted-foreground">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {faculty.researchAreas && faculty.researchAreas.length > 0 && (
                  <div>
                    <h3 className="font-serif font-bold text-[#0f2d5c] text-xl mb-3">Research Areas</h3>
                    <ul className="space-y-2">
                      {faculty.researchAreas.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gold mr-2">•</span>
                          <span className="text-muted-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyDetailsPage;