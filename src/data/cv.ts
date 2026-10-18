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

/** A client engagement carried out while at a consulting Employer. */
export interface Assignment {
    client: string;
    description: string;
    /** Technologies, shown as one quiet line. Omit when there are none worth listing. */
    tech?: string[];
}

interface EmployerBase {
    name: string;
    /** As displayed, e.g. "2023 – present". */
    period: string;
    /** Jakob's job title at the Employer. */
    title: string;
}

/** A consulting Employer: Jakob's work there is a list of Assignments. */
export interface ConsultingEmployer extends EmployerBase {
    assignments: Assignment[];
}

/** A non-consulting Employer: Jakob's work there is a single role, no Assignments. */
export interface InHouseEmployer extends EmployerBase {
    role: {
        description: string;
        tech: string[];
    };
}

export type Employer = ConsultingEmployer | InHouseEmployer;

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
        "knows more than I do, and at Consid I've run knowledge-sharing sessions on my own time " +
        'because of it. I care about work being understood, not just delivered. ' +
        "I'm curious where the field is going, DuckDB and cheap single-machine compute " +
        'especially, and whether they will change how we think about distributed analytics.',
    employers: [
        {
            name: 'Consid',
            period: '2023 – present',
            title: 'Data Engineer',
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
            title: 'Data Engineer',
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
            title: 'Data Platform Owner',
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
            title: 'Tech Lead / Consultant',
            assignments: [
                {
                    client: 'Volvo Cars',
                    description:
                        'Led the global rollout of Configure Your Volvo across 30 markets and ' +
                        "owned its roadmap. Configured the legacy backend systems to each market's " +
                        'requirements, working from sparse documentation.',
                },
            ],
        },
    ],
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
