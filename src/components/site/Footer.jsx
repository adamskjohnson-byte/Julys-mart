import { Link } from 'react-router-dom';
import Brand from '@/components/site/Brand';
import { DEPARTMENTS } from '@/lib/catalog';
import { HOURS, SITE } from '@/lib/site';
import { whatsappLink } from '@/lib/format';

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Brand dark />
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-ivory/55">
              {SITE.tagline} Open seven days a week — shop in store at July&rsquo;s Mart.
            </p>
            <a
              href={whatsappLink(`Hello ${SITE.name}, I would like to make an enquiry.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-ivory/25 px-5 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-brass hover:text-brass"
            >
              WhatsApp the concierge
            </a>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/35">Shop</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/65">
              {DEPARTMENTS.map((department) => (
                <li key={department.key}>
                  <Link
                    to={`/shop?department=${department.key}`}
                    className="transition-colors hover:text-ivory"
                  >
                    {department.short}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="transition-colors hover:text-ivory">
                  Everything
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/35">Visit</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/65">
              <li>{SITE.address}</li>
              {HOURS.map((slot) => (
                <li key={slot.day}>
                  {slot.day}
                  <span className="block text-ivory/40">{slot.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-ivory/35">Contact</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/65">
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-ivory">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-ivory">
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link to="/visit" className="hover:text-ivory">
                  Directions &amp; parking
                </Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-ivory">
                  Bulk &amp; business supply
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-[11px] text-ivory/35 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name} &middot; {SITE.city}, {SITE.state}
          </span>
          <span className="eyebrow text-[9px]">One roof. Four departments.</span>
        </div>
      </div>
    </footer>
  );
}