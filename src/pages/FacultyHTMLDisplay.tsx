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
    // Scroll to top whenever slug changes
    window.scrollTo(0, 0);
    
    const fetchFacultyHTML = async () => {
      try {
        setLoading(true);

        // Map slug (generated from faculty name) → actual HTML filename
        // To find a slug: generateSlug("Prof. Nandini C.P") → "prof-nandini-c-p"
        const fileMap: Record<string, string> = {
          "prof-dr-d-surya-prakasa-rao": "prof-d-surya-prakasa-rao",
          "prof-nandini-c-p": "prof-nandini-c-p",
          "dr-dayananda-murthy-c-p": "dr-dayananda-murthy-c-p",
          // Add more mappings here as you add HTML files, e.g.:
          // "dr-p-jogi-naidu": "dr-p-jogi-naidu",
        };

        const fileName = fileMap[slug || ""] ?? slug;
        const filePath = `/src/faculty/${fileName}.html`;

        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error(`Faculty page not found: ${filePath}`);
        }

        const html = await response.text();

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract faculty name from title
        const titleEl = doc.querySelector("title");
        if (titleEl) {
          const rawTitle = titleEl.textContent || "";
          setFacultyName(
            rawTitle
              .replace(/\s*-\s*DSNLU Faculty\s*$/i, "")
              .replace(/\s*-\s*DAMODARAM.*$/i, "")
              .trim()
          );
        }

        // Extract the main tab content (col-md-9)
        const mainCol = doc.querySelector(".col-md-9");
        if (mainCol) {
          setProfileContent(mainCol.innerHTML);
        }

        // Extract sidebar (col-md-3)
        const sidebarCol = doc.querySelector(".col-md-3");
        if (sidebarCol) {
          setSidebarContent(sidebarCol.innerHTML);
        }

        // Scroll to top after content loads
        window.scrollTo(0, 0);
        setError(null);
      } catch (err) {
        console.error("Error loading faculty HTML:", err);
        setError("Faculty member not found");
        // Still scroll to top even if there's an error
        window.scrollTo(0, 0);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchFacultyHTML();
    }
  }, [slug]);

  // ✅ KEY FIX: Initialize tabs inside a useEffect that runs AFTER the HTML
  // is rendered into the DOM via dangerouslySetInnerHTML.
  // A <script> tag inside dangerouslySetInnerHTML never executes in React.
  useEffect(() => {
    if (!profileContent) return;

    // Small delay to ensure dangerouslySetInnerHTML has painted
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
          container.querySelectorAll(".tab-pane").forEach((p) => {
            p.classList.remove("active", "in");
          });

          // Activate clicked
          link.parentElement?.classList.add("active");
          const pane = container.querySelector(target);
          if (pane) pane.classList.add("active", "in");
        });
      });

      // Activate the first tab
      const firstActiveLi = container.querySelector(".nav-pills li.active a");
      if (firstActiveLi) {
        const firstTarget = firstActiveLi.getAttribute("href");
        if (firstTarget) {
          const firstPane = container.querySelector(firstTarget);
          if (firstPane) firstPane.classList.add("active", "in");
        }
      } else if (pills.length > 0) {
        // Fallback: activate first pill
        pills[0].parentElement?.classList.add("active");
        const firstTarget = pills[0].getAttribute("href");
        if (firstTarget) {
          const firstPane = container.querySelector(firstTarget);
          if (firstPane) firstPane.classList.add("active", "in");
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [profileContent]); // re-runs every time new HTML is loaded

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
            {/* Sidebar */}
            {sidebarContent && (
              <aside className="lg:w-64 flex-shrink-0">
                <div
                  className="faculty-sidebar bg-white rounded-2xl shadow p-6 text-center sticky top-6"
                  dangerouslySetInnerHTML={{ __html: sidebarContent }}
                />
              </aside>
            )}

            {/* Main profile content */}
            {profileContent && (
              <div
                className="flex-1 faculty-profile-content bg-white rounded-2xl shadow p-8"
                dangerouslySetInnerHTML={{ __html: profileContent }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Scoped styles for injected HTML */}
      <style>{`
        .faculty-profile-content h2.bborder {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f2d5c;
          border-bottom: 2px solid #c9a84c;
          padding-bottom: 6px;
          margin-bottom: 14px;
          margin-top: 28px;
        }
        .faculty-profile-content ul.profile-div {
          list-style: none;
          padding: 0;
          margin-bottom: 16px;
        }
        .faculty-profile-content ul.profile-div li {
          margin-bottom: 8px;
          text-align: justify;
        }
        .faculty-profile-content ul:not(.profile-div):not(.nav):not(.nav-pills) {
          padding-left: 1.5rem;
          margin-bottom: 16px;
        }
        .faculty-profile-content ul:not(.profile-div):not(.nav):not(.nav-pills) li {
          margin-bottom: 6px;
          text-align: justify;
        }
        .faculty-profile-content ol {
          padding-left: 1.5rem;
          margin-bottom: 16px;
        }
        .faculty-profile-content ol li {
          margin-bottom: 6px;
          text-align: justify;
        }
        .faculty-profile-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 0.85rem;
          overflow-x: auto;
          display: block;
        }
        .faculty-profile-content table thead tr {
          background: #0f2d5c !important;
          color: white;
        }
        .faculty-profile-content table th,
        .faculty-profile-content table td {
          border: 1px solid #ddd;
          padding: 8px 10px;
          text-align: left;
          vertical-align: top;
        }
        .faculty-profile-content table tbody tr:nth-child(even) {
          background: #f9f9f9;
        }
        .faculty-profile-content p {
          margin-bottom: 12px;
          text-align: justify;
        }
        .faculty-profile-content strong,
        .faculty-profile-content b {
          color: #0f2d5c;
        }

        /* ── Tab Pills ── */
        .faculty-profile-content .nav-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin-bottom: 24px;
          float: none !important;
        }
        .faculty-profile-content .nav-pills li a {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 9999px;
          background: #f3f4f6;
          color: #0f2d5c;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .faculty-profile-content .nav-pills li.active a,
        .faculty-profile-content .nav-pills li a:hover {
          background: #c9a84c;
          color: white;
        }

        /* ── Tab Panes ── */
        .faculty-profile-content .tab-content {
          overflow: visible;
          clear: both;
        }
        .faculty-profile-content .tab-content .tab-pane {
          display: none;
        }
        .faculty-profile-content .tab-content .tab-pane.active {
          display: block;
        }

        /* ── Vertical tabs layout override ── */
        .faculty-profile-content .vertical-tabs {
          display: block;
        }
        .faculty-profile-content .pull-left {
          float: none !important;
        }

        /* ── Sidebar ── */
        .faculty-sidebar img.singel-user-img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #c9a84c;
          margin: 0 auto 12px;
          display: block;
        }
        .faculty-sidebar h2,
        .faculty-sidebar h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f2d5c;
          margin: 0 0 4px;
          border: none !important;
          padding: 0 !important;
        }
        .faculty-sidebar .position {
          color: #666;
          font-size: 0.875rem;
          margin: 2px 0;
        }
        .faculty-sidebar h6.bborder {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f2d5c;
          border-bottom: 1px solid #c9a84c;
          padding-bottom: 4px;
          margin: 12px 0 4px;
          text-transform: uppercase;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default FacultyHTMLDisplay;