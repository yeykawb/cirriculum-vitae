// The single source of truth for every CV fact on the page.
// Components render from this module and never hard-code CV text.

export interface Contact {
    email: string;
    /** Display form, e.g. "+46 73 232 73 73". */
    phone: string;
    linkedin: string;
    github: string;
    location: string;
}

/** What Jakob did: an Assignment, or the single role at an in-house Employer. */
export interface Work {
    description: string;
    /** Technologies, shown as one quiet line. Omit when there are none worth listing. */
    tech?: string[];
}

/** A client engagement carried out while at a consulting Employer. */
export interface Assignment extends Work {
    client: string;
}

interface EmployerBase {
    name: string;
    /** As displayed, e.g. "2023 – present". */
    period: string;
    /** Jakob's job title at the Employer (not to be confused with his Title). */
    position: string;
}

/** A consulting Employer: Jakob's work there is a list of Assignments. */
export interface ConsultingEmployer extends EmployerBase {
    assignments: Assignment[];
}

/** A non-consulting Employer: Jakob's work there is a single role, no Assignments. */
export interface InHouseEmployer extends EmployerBase {
    role: Work;
}

export type Employer = ConsultingEmployer | InHouseEmployer;

/** One group of skills, named as on the PDF (Platform, Delivery, Data, Practice). */
export interface SkillGroup {
    name: string;
    items: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    /** As displayed, e.g. "Nov 2025". */
    date: string;
}

/** Certifications under one heading, e.g. "Data & Engineering". */
export interface CertificationGroup {
    name: string;
    certifications: Certification[];
}

export interface Education {
    school: string;
    degree: string;
    /** As displayed, e.g. "2015 – 2018". */
    period: string;
}

export interface Interest {
    name: string;
    /** One sentence, first person. */
    description: string;
}

export interface ProjectLink {
    label: string;
    href: string;
}

export interface Project {
    name: string;
    description: string;
    /** Technologies, shown as one quiet line. */
    tech: string[];
    links: ProjectLink[];
}

export interface OutsideWork {
    interests: Interest[];
    projects: Project[];
}

export interface Resume {
    /** Link text for the print version. */
    label: string;
    /** File name under `public/`; components prefix it with the site base path. */
    file: string;
}

export interface CV {
    name: string;
    title: string;
    summary: string;
    contact: Contact;
    about: string;
    /** Newest first. */
    employers: Employer[];
    skills: SkillGroup[];
    /** In display order. */
    certifications: CertificationGroup[];
    education: Education;
    outsideWork: OutsideWork;
    /** One modest line that opens the Closing section. */
    closingLine: string;
    resume: Resume;
}

export const cv: CV = {
    name: 'Jakob Agelin',
    title: 'Data Platform Engineer',
    summary:
        'Data platform engineer with eight years of consulting across Scandinavia. ' +
        'Owns and modernises Azure and Databricks platforms end to end: architecture, ' +
        'CI/CD, data quality and the standards other engineers build on.',
    contact: {
        email: 'yeykawb@proton.me',
        phone: '+46 73 232 73 73',
        linkedin: 'https://www.linkedin.com/in/jakobagelin/',
        github: 'https://github.com/yeykawb',
        location: 'Mölnlycke, Sweden',
    },
    about:
        'I learn best in conversation, talking a problem through or listening to someone who ' +
        "knows more than I do; at Consid I've organised knowledge-sharing sessions on my own " +
        'time because I enjoy it. I care about work being understood, not just delivered. ' +
        "I'm curious where the field is going, DuckDB and cheap single-machine compute " +
        'especially, and whether they will change how we think about distributed analytics.',
    employers: [
        {
            name: 'Consid',
            period: '2023 – present',
            position: 'Data Engineer',
            assignments: [
                {
                    client: 'Ambea',
                    description:
                        'Led the move of a multi-country BI platform from on-premises to Azure ' +
                        'Databricks. Moved orchestration to Databricks-native jobs and set up ' +
                        'governance in Unity Catalog. Split dbt Cloud into domain projects with ' +
                        'dbt Mesh, on a medallion architecture with Kimball modelling. Built a ' +
                        'SQL Server metadata database for data quality management. Brought ' +
                        'AI-assisted coding practices into the team; CI/CD in Azure DevOps and ' +
                        'Terraform.',
                    tech: [
                        'Azure Databricks',
                        'Unity Catalog',
                        'dbt Cloud',
                        'dbt Mesh',
                        'PySpark',
                        'SQL Server',
                        'Azure DevOps',
                        'Terraform',
                    ],
                },
                {
                    client: 'Bostadsförmedlingen i Stockholm',
                    description:
                        'Modernised a legacy on-premises BI solution: SQL Server, SSIS and Power ' +
                        'BI. Applied Inmon and Kimball principles to the data model and built ' +
                        'the reports in Power BI Report Server with DAX.',
                    tech: ['SQL Server', 'SSIS', 'Power BI Report Server', 'DAX', 'Git'],
                },
            ],
        },
        {
            name: 'Capgemini',
            period: '2022 – 2023',
            position: 'Data Engineer',
            assignments: [
                {
                    client: 'Hedin Bil',
                    description:
                        'Data pipelines in Data Factory and Databricks, built for data quality ' +
                        'and cost efficiency. Pure data engineering, with DevOps skills built up ' +
                        'alongside.',
                    tech: ['Azure Data Factory', 'Azure Databricks', 'DevOps'],
                },
            ],
        },
        {
            name: 'Visiba Care',
            period: '2021 – 2022',
            position: 'Data Platform Owner',
            role: {
                description:
                    'One-person data team at a healthcare startup. Built and owned the platform ' +
                    'from scratch, including YAML CI/CD for Data Factory, SQL, Analysis Services ' +
                    'and Power BI. Transformations in T-SQL and Tabular Editor, alongside ' +
                    'stakeholder workshops and documentation.',
                tech: [
                    'Azure Data Factory',
                    'SQL Server',
                    'T-SQL',
                    'Tabular Editor',
                    'Analysis Services',
                    'Power BI',
                ],
            },
        },
        {
            name: 'Capgemini',
            period: '2018 – 2021',
            position: 'Tech Lead / Consultant',
            assignments: [
                {
                    client: 'Volvo Cars',
                    description:
                        'Led the global rollout of Configure Your Volvo across 30+ markets and ' +
                        "owned its roadmap. Configured the legacy backend systems to each market's " +
                        'requirements, working from sparse documentation.',
                },
            ],
        },
    ],
    skills: [
        {
            name: 'Platform',
            items: ['Azure', 'Databricks (Unity Catalog, Lakeflow Jobs)', 'Data Factory', 'SQL Server'],
        },
        {
            name: 'Delivery',
            items: ['Terraform', 'Azure DevOps', 'Git', 'YAML CI/CD', 'Docker'],
        },
        {
            name: 'Data',
            items: ['SQL', 'Python', 'PySpark', 'T-SQL', 'dbt Cloud', 'dbt Mesh', 'DAX', 'Power BI'],
        },
        {
            name: 'Practice',
            items: [
                'Medallion architecture',
                'Kimball',
                'data governance',
                'data quality',
                'AI-assisted development',
            ],
        },
    ],
    certifications: [
        {
            name: 'Data & Engineering',
            certifications: [
                { name: 'dbt Developer', issuer: 'dbt Labs', date: 'Nov 2025' },
                { name: 'Data Engineer Associate', issuer: 'Databricks', date: 'Nov 2023' },
                { name: 'Spark 3.0 Associate Developer', issuer: 'Databricks', date: 'Feb 2023' },
                { name: 'Azure Data Engineer Associate', issuer: 'Microsoft', date: 'Nov 2022' },
            ],
        },
        {
            name: 'Process & Methodology',
            certifications: [
                { name: 'SAFe 5 Agilist', issuer: 'Scaled Agile', date: 'Dec 2020' },
                { name: 'CPRE Foundation Level', issuer: 'IREB', date: 'Nov 2018' },
                { name: 'Professional Scrum Master I', issuer: 'Scrum.org', date: 'Sep 2018' },
            ],
        },
    ],
    education: {
        school: 'Göteborgs Universitet',
        degree: 'BSc Systems Science, IT, Human and Organisation',
        period: '2015 – 2018',
    },
    outsideWork: {
        interests: [
            {
                name: 'Ice cream science',
                description:
                    'I make ice cream at home and am fascinated by the crystallisation, aeration and ' +
                    'emulsifier chemistry that decide its texture.',
            },
            {
                name: 'Sourdough baking',
                description:
                    'I bake sourdough, tinkering with starters, hydration and long cold proofs to ' +
                    'get the flavour, crust and crumb right.',
            },
        ],
        projects: [
            {
                name: 'Ice Cream Analytics',
                description:
                    'A personal data platform for my ice cream batches: DuckDB transformations ' +
                    'turn raw records into a scored sensory dashboard, a medallion architecture ' +
                    'applied to home cooking.',
                tech: ['DuckDB', 'dbt', 'Data modelling', 'Analytics engineering', 'Chart.js'],
                links: [
                    { label: 'GitHub', href: 'https://github.com/yeykawb/ice-cream-analytics' },
                    { label: 'Explore', href: 'https://yeykawb.github.io/ice-cream-analytics/' },
                ],
            },
            {
                name: 'dbt + PostgreSQL data platform',
                description:
                    'A containerised end-to-end ELT example: mocked sources load into PostgreSQL ' +
                    'and dbt takes them through bronze, staging, intermediate and mart layers, ' +
                    'with tests, snapshots and generated docs.',
                tech: ['dbt', 'PostgreSQL', 'Docker', 'Python', 'Metabase', 'sqlfluff'],
                links: [{ label: 'GitHub', href: 'https://github.com/yeykawb/consid_dbt' }],
            },
        ],
    },
    closingLine: "If something here sounds like what you're looking for, I'd be glad to talk.",
    resume: {
        label: 'Download PDF resume',
        file: 'Jakob_Agelin_Resume.pdf',
    },
};

/** Narrows an Employer to one with Assignments (as opposed to a single role). */
export function hasAssignments(employer: Employer): employer is ConsultingEmployer {
    return 'assignments' in employer;
}

export interface ContactLink {
    label: string;
    href: string;
}

/** A URL without its protocol, "www." or trailing slash, as printed on the PDF. */
function shortUrl(url: string): string {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export interface ContactLinks {
    email: ContactLink;
    phone: ContactLink;
    linkedin: ContactLink;
    github: ContactLink;
}

/** Contact details as links, labelled as printed on the PDF. */
export function contactLinks(contact: Contact): ContactLinks {
    return {
        email: { label: contact.email, href: `mailto:${contact.email}` },
        phone: { label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
        linkedin: { label: shortUrl(contact.linkedin), href: contact.linkedin },
        github: { label: shortUrl(contact.github), href: contact.github },
    };
}

/** The PDF resume as a link under the site's base path, e.g. "/cirriculum-vitae/". */
export function resumeLink(resume: Resume, base: string): ContactLink {
    return { label: resume.label, href: `${base.replace(/\/$/, '')}/${resume.file}` };
}
