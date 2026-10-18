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

export interface CV {
    name: string;
    title: string;
    summary: string;
    contact: Contact;
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
};

export interface ContactLink {
    label: string;
    href: string;
}

/** A URL without its protocol, "www." or trailing slash, as printed on the PDF. */
function shortUrl(url: string): string {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/** Contact details as links, in the PDF's order: email, phone, LinkedIn, GitHub. */
export function contactLinks(contact: Contact): ContactLink[] {
    return [
        { label: contact.email, href: `mailto:${contact.email}` },
        { label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
        { label: shortUrl(contact.linkedin), href: contact.linkedin },
        { label: shortUrl(contact.github), href: contact.github },
    ];
}
