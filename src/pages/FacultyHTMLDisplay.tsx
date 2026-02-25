import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FacultyHTMLDisplay = () => {
  const { slug } = useParams<{ slug: string }>();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultyHTML = async () => {
      try {
        setLoading(true);
        // Construct the path to the faculty HTML file
        const filePath = `/faculty/${slug}.html`;
        
        const response = await fetch(filePath);
        
        if (!response.ok) {
          throw new Error(`Faculty page not found: ${filePath}`);
        }
        
        const html = await response.text();
        setHtmlContent(html);
        setError(null);
      } catch (err) {
        console.error('Error loading faculty HTML:', err);
        setError('Faculty member not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchFacultyHTML();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading faculty details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !htmlContent) {
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

  // Extract title from HTML content if possible
  const extractTitle = () => {
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
      return titleMatch[1].replace(/\s*-\s*DAMODARAM SANJIVAYYA NATIONAL LAW UNIVERSITY\s*$/, '');
    }
    return "Faculty Details";
  };

  const facultyName = extractTitle();

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
            <span className="font-medium text-gold">{facultyName}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-[#0f2d5c] py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050335392-9bc501535231?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <h1 className="font-serif text-3xl font-bold text-white md:text-4xl uppercase tracking-wider">
              Faculty Profile
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </div>
        </section>

        {/* Main Content - Inject the HTML content here */}
        <div className="py-16 container">
          <div 
            className="faculty-html-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyHTMLDisplay;