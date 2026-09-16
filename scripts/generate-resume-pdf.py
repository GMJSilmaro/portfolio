#!/usr/bin/env python3
"""Generate a public personal resume PDF (not the company CV)."""

from pathlib import Path

from fpdf import FPDF
from fpdf.enums import XPos, YPos

OUT = Path(__file__).resolve().parents[1] / "public" / "gmj-silmaro-resume.pdf"


class Resume(FPDF):
    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", size=8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 8, f"gmjsilmaro.dev  |  Page {self.page_no()}", align="C")


def section_title(pdf: Resume, title: str) -> None:
    pdf.ln(5)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(13, 110, 86)
    pdf.cell(0, 7, title.upper(), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_draw_color(20, 24, 31)
    pdf.set_line_width(0.2)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
    pdf.ln(3)
    pdf.set_text_color(20, 24, 31)


def job(
    pdf: Resume,
    role: str,
    company: str,
    period: str,
    location: str,
    bullets: list[str],
) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 6, role, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("Helvetica", size=9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(
        0,
        5,
        f"{company}  |  {location}  |  {period}",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )
    pdf.set_text_color(20, 24, 31)
    pdf.set_font("Helvetica", size=9)
    for bullet in bullets:
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(pdf.epw, 4.6, f"- {bullet}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(2)


def main() -> None:
    pdf = Resume(format="A4")
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()
    pdf.set_margins(18, 16, 18)
    pdf.set_x(pdf.l_margin)

    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(20, 24, 31)
    pdf.cell(0, 10, "Gilbert Michael Jay Silmaro", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", size=11)
    pdf.set_text_color(13, 110, 86)
    pdf.cell(
        0,
        6,
        "Technical Lead Consultant  |  Software Engineer",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )

    pdf.set_font("Helvetica", size=9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(
        0,
        5,
        "gmjsilmaro03@gmail.com  |  github.com/GMJSilmaro  |  gmjsilmaro.dev",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )
    pdf.ln(2)

    section_title(pdf, "Profile")
    pdf.set_font("Helvetica", size=10)
    pdf.set_text_color(20, 24, 31)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(
        pdf.epw,
        5,
        "Technical Lead Consultant and Software Engineer with 5+ years building "
        "fullstack web and mobile systems, SAP Business One integrations, e-Invoice "
        "platforms, APIs, databases, Docker, and CI/CD. I lead delivery, mentor teams, "
        "and ship production software for enterprise clients.",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )

    section_title(pdf, "Experience")
    job(
        pdf,
        "Technical Lead Consultant",
        "Pixelcare Consulting",
        "2026 - Present",
        "Remote",
        [
            "Lead technical delivery across concurrent client projects",
            "Own architecture, mentoring, code review, and release quality",
            "Manage Docker, Traefik, CI/CD (GitHub Actions), PostgreSQL, and Redis",
        ],
    )
    job(
        pdf,
        "Software Engineer",
        "Pixelcare Consulting",
        "2023 - 2026",
        "Remote",
        [
            "Built Field Service Management web portal and technician mobile app",
            "Developed e-Invoice middleware for LHDN-aligned tax workflows",
            "Delivered REST APIs and enterprise system integrations",
        ],
    )
    job(
        pdf,
        "Web Developer",
        "Blue Ocean Data Solutions",
        "2023",
        "On-site",
        [
            "Migrated legacy applications to production ASP.NET systems",
            "Implemented auth, reporting, dashboards, and business workflows",
        ],
    )
    job(
        pdf,
        "Fullstack Developer",
        "Eonbotz Technology",
        "2021 - 2023",
        "On-site",
        [
            "Delivered school management and parent/student portals end to end",
            "Mentored web developers and owned timelines and documentation",
        ],
    )
    job(
        pdf,
        "Freelance Developer",
        "Independent",
        "2021 - 2023",
        "Remote",
        [
            "Built Laravel/Vue and TALL-stack applications for private clients",
            "Shipped biometric events platform and marketing/auth interfaces",
        ],
    )

    section_title(pdf, "Selected work")
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 5, "e-Invoice Middleware", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("Helvetica", size=9)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(
        pdf.epw,
        4.5,
        "Compliance middleware for automated tax workflows, invoice processing, "
        "ERP integration, and reporting.",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )
    pdf.ln(1)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(
        0,
        5,
        "Field Services Management (Web + Mobile)",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )
    pdf.set_font("Helvetica", size=9)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(
        pdf.epw,
        4.5,
        "Operations portal and React Native app for scheduling, dispatch, "
        "job tracking, signatures, and offline-friendly field workflows.",
        new_x=XPos.LMARGIN,
        new_y=YPos.NEXT,
    )

    section_title(pdf, "Skills")
    pdf.set_font("Helvetica", size=9)
    for line in [
        "Languages: TypeScript, JavaScript, C#, PHP, Python, SQL",
        "Frontend & Mobile: React, Next.js, React Native, Expo, Tailwind CSS",
        "Backend: Node.js, Express, ASP.NET, Laravel, REST APIs, OAuth",
        "Data: MS-SQL, PostgreSQL, MySQL, Firebase, Redis",
        "DevOps: Docker, GitHub Actions, Traefik, Git, Ubuntu",
        "Enterprise: SAP Business One, e-Invoice / LHDN integrations",
    ]:
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(pdf.epw, 4.5, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    section_title(pdf, "Education")
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 5, "BS in Information Technology", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("Helvetica", size=9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 5, "Interface Computer College  |  2021", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
