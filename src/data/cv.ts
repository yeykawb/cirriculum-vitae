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
    resume: {
        label: 'Download PDF resume',
        file: 'Jakob_Agelin_Resume.pdf',
    },
};

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
