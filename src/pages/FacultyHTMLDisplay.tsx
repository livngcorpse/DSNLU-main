import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FacultyHTMLDisplay = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profileContent, setProfileContent] = useState<string | null>(null);
  const [sidebarContent, setSidebarContent] = useState<string | null>(null);
  const [facultyName, setFacultyName] = useState<string>("Faculty Profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultyHTML = async () => {
      try {
        setLoading(true);

        const fileMap: Record<string, string> = {
          "prof-dr-d-surya-prakasa-rao": "prof-d-surya-prakasa-rao",
          "prof-nandini-c-p": "prof-nandini-c-p",
          "dr-dayananda-murthy-c-p": "dr-dayananda-murthy-c-p",
          "dr-p-jogi-naidu": "dr-p-jogi-naidu",
          "dr-r-bharat-kumar": "dr-r-bharat-kumar",
          "dr-soma-battacharjya": "ms-soma-battacharjya-m-a-ll-m",
          "dr-n-bhagya-lakshmi": "dr-namballa-bhagyalakshmi",
          "dr-ch-lakshmi": "dr-lakshmi-chebolu",
          "dr-a-nageswara-rao": "dr-a-nageswara-rao",
          "dr-rifat-khan": "dr-rifat-khan",
          "dr-viswachandra-nath-madasu": "dr-viswachandra-nath-madasu",
          "mr-abhishek-sinha": "mr-abhishek-sinha",
          "dr-deepthi-r": "dr-deepthi-rodda",
          "dr-neelima-boghadi": "dr-b-neelima",
          "ms-sherley-hepsiba-dokiburra": "dr-sherleyhepsibadokiburra",
          "dr-arvind-nath-tripathi": "dr-arvindnath-tripathi",
          "ms-d-aparna": "ms-d-aparna",
          "ms-gali-parivarthana": "ms-galiparivarthana",
          "dr-s-kiran-kumari": "dr-s-kiran-kumari",
          "dr-k-sudha": "dr-k-sudha",
          "dr-v-sunitha": "dr-v-sunitha",
          "dr-paramata-bhuvaneswari": "dr-p-bhuvaneswari",
          "dr-durga-prasad-inturu": "dr-i-durga-prasad",
          "prof-dr-bhavani-prasad-panda": "prof-dr-bhavani-prasad-panda",
          "dr-b-surekha-reddy": "dr-b-surekha-reddy",
          "mr-r-v-vishnu-kumar": "mr-r-v-vishnukumar",
          "dr-t-y-nirmala-devi": "dr-t-y-nirmala-devi",
          "mr-r-v-prasad": "mr-r-v-prasad",
          "dr-sarita-rani-chukka": "dr-sarita-rani-chukka",
          "prof-dr-david-ambrose": "david-ambrose",
          "prof-dr-a-raghunadha-reddy": "prof-a-raghunadha-reddy",
          "prof-dr-reddivari-revathi": "prof-reddivari-revathi",
          "prof-dr-balraj-chauhan": "",
          "prof-dr-k-i-vibhute": "professor-dr-khushal-vibhute",
          
        };

        const fileName = fileMap[slug || ""] ?? slug;
        const filePath = `/src/faculty/${fileName}.html`;

        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Not found: ${filePath}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Faculty name from title
        const titleEl = doc.querySelector("title");
        if (titleEl) {
          setFacultyName(
            (titleEl.textContent || "")
              .replace(/\s*-\s*DSNLU Faculty\s*$/i, "")
              .replace(/\s*-\s*DAMODARAM.*$/i, "")
              .trim()
          );
        }

        const mainCol = doc.querySelector(".col-md-9");
        if (mainCol) setProfileContent(mainCol.innerHTML);

        const sidebarCol = doc.querySelector(".col-md-3");
        if (sidebarCol) setSidebarContent(sidebarCol.innerHTML);

        setError(null);
      } catch (err) {
        console.error("Error loading faculty HTML:", err);
        setError("Faculty member not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchFacultyHTML();
  }, [slug]);

  // Initialize Bootstrap-style pill tabs — scripts inside dangerouslySetInnerHTML
  // never execute in React, so we wire up clicks via useEffect after render
  useEffect(() => {
    if (!profileContent) return;

    const timer = setTimeout(() => {
      const container = document.querySelector(".faculty-profile-content");
      if (!container) return;

      const pills = container.querySelectorAll<HTMLAnchorElement>(
        '.nav-pills a[data-toggle="pill"]'
      );

      pills.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = link.getAttribute("href");
          if (!target) return;

          // Deactivate all
          pills.forEach((l) => l.parentElement?.classList.remove("active"));
          container.querySelectorAll(".tab-pane").forEach((p) =>
            p.classList.remove("active", "in")
          );

          // Activate clicked
          link.parentElement?.classList.add("active");
          const pane = container.querySelector(target);
          if (pane) {
            pane.classList.add("active", "in");
            // Scroll to top when changing tabs
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });

      // Activate first tab on load
      const firstActive = container.querySelector<HTMLAnchorElement>(".nav-pills li.active a");
      const firstLink = firstActive ?? pills[0];
      if (firstLink) {
        firstLink.parentElement?.classList.add("active");
        const target = firstLink.getAttribute("href");
        if (target) {
          const pane = container.querySelector(target);
          if (pane) pane.classList.add("active", "in");
        }
      }
      
      // Scroll to top after tabs are initialized
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

    return () => clearTimeout(timer);
  }, [profileContent]);

  // Effect to scroll to top when content changes
  useEffect(() => {
    if (!loading && (profileContent || sidebarContent)) {
      // Use a slight delay to ensure content is fully rendered
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [profileContent, sidebarContent, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading faculty details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || (!profileContent && !sidebarContent)) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Faculty Member Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
              The faculty member you're looking for doesn't exist or may have been moved.
            </p>
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
            <span className="font-medium text-gold">{facultyName}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-[#0f2d5c] py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050335392-9bc501535231?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            <h1 className="font-serif text-3xl font-bold text-white md:text-4xl uppercase tracking-wider">
              Faculty Profile
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </div>
        </section>

        {/* Faculty Content */}
        <div className="py-12 container">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main profile content — left */}
            {profileContent && (
              <div
                className="flex-1 faculty-profile-content bg-white rounded-2xl shadow p-8"
                dangerouslySetInnerHTML={{ __html: profileContent }}
              />
            )}

            {/* Sidebar — right */}
            {sidebarContent && (
              <aside className="lg:w-72 flex-shrink-0">
                <div
                  className="faculty-sidebar bg-white rounded-2xl shadow p-6 text-center sticky top-6"
                  dangerouslySetInnerHTML={{ __html: sidebarContent }}
                />
              </aside>
            )}

          </div>
        </div>
      </main>

      <style>{`
        /* ─── RESET problematic Tailwind overrides inside injected HTML ─── */
        .faculty-profile-content *,
        .faculty-sidebar * {
          box-sizing: border-box;
        }

        /* ─── TAB PILLS ─── */
        .faculty-profile-content .nav-pills {
          display: flex !important;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none !important;
          padding: 0 !important;
          margin: 0 0 24px !important;
          float: none !important;
        }
        .faculty-profile-content .nav-pills li {
          margin: 0 !important;
          padding: 0 !important;
        }
        .faculty-profile-content .nav-pills li a {
          display: inline-block;
          padding: 7px 22px;
          border-radius: 9999px;
          background: #f0f0f0;
          color: #0f2d5c;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .faculty-profile-content .nav-pills li.active a,
        .faculty-profile-content .nav-pills li a:hover {
          background: #c9a84c;
          color: #fff;
        }

        /* ─── TAB PANES ─── */
        .faculty-profile-content .tab-content {
          clear: both;
          overflow: visible;
        }
        .faculty-profile-content .tab-content .tab-pane {
          display: none !important;
        }
        .faculty-profile-content .tab-content .tab-pane.active {
          display: block !important;
        }

        /* ─── Layout fixes for vertical-tabs structure ─── */
        .faculty-profile-content .vertical-tabs { display: block; }
        .faculty-profile-content .pull-left { float: none !important; }

        /* ─── Section headings ─── */
        .faculty-profile-content h2.bborder {
          font-size: 1rem;
          font-weight: 700;
          color: #333;
          border-bottom: 2px solid #c9a84c;
          padding-bottom: 6px;
          margin: 0 0 16px !important;
          margin-top: 4px !important;
        }

        /* ─── Paragraphs — keep natural flow, no word-break ─── */
        .faculty-profile-content p {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #333;
          margin-bottom: 8px;
          text-align: left;
          word-break: normal;
          overflow-wrap: normal;
          white-space: normal;
        }
        .faculty-profile-content p strong,
        .faculty-profile-content p b {
          color: #0f2d5c;
        }

        /* ─── Ordered lists (Publications, Conferences) ─── */
        .faculty-profile-content ol {
          padding-left: 1.5rem;
          margin: 0 0 16px;
        }
        .faculty-profile-content ol li {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #333;
          margin-bottom: 6px;
          text-align: justify;
        }

        /* ─── Unordered lists (Research & Teaching bullets etc) ─── */
        .faculty-profile-content ul:not(.nav-pills):not(.nav) {
          padding-left: 1.5rem !important;
          margin: 0 0 16px !important;
          list-style: disc !important;
        }
        .faculty-profile-content ul:not(.nav-pills):not(.nav) li {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #333;
          margin-bottom: 6px;
          text-align: left;
          list-style: disc !important;
          display: list-item !important;
        }

        /* ─── Tables ─── */
        .faculty-profile-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 0.85rem;
        }
        .faculty-profile-content table th,
        .faculty-profile-content table td {
          border: 1px solid #ddd;
          padding: 7px 10px;
          text-align: left;
          vertical-align: top;
        }
        .faculty-profile-content table thead tr {
          background: #0f2d5c;
          color: #fff;
        }
        .faculty-profile-content table tbody tr:nth-child(even) {
          background: #f9f9f9;
        }

        /* ─── SIDEBAR ─── */
        .faculty-sidebar img.singel-user-img {
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #c9a84c;
          margin: 0 auto 16px;
          display: block;
        }
        .faculty-sidebar h2,
        .faculty-sidebar h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f2d5c;
          margin: 0 0 4px !important;
          border: none !important;
          padding: 0 !important;
        }
        .faculty-sidebar .position {
          color: #555;
          font-size: 0.825rem;
          margin: 2px 0;
          display: block;
        }
        .faculty-sidebar h6.bborder {
          font-size: 0.78rem;
          font-weight: 700;
          color: #0f2d5c;
          border-bottom: 1px solid #c9a84c !important;
          padding-bottom: 4px !important;
          margin: 14px 0 4px !important;
          text-transform: uppercase;
        }
        .faculty-sidebar p {
          font-size: 0.825rem;
          color: #444;
          margin: 2px 0 8px;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default FacultyHTMLDisplay;