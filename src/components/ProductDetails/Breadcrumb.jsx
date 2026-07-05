import { ChevronRight } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold text-slate-600 sm:text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {isLast ? (
              <span className="font-extrabold text-slate-950">{item.label}</span>
            ) : (
              <Link to={item.href} className="transition hover:text-rose-500">
                {item.label}
              </Link>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
          </span>
        );
      })}
    </nav>
  );
}

export default memo(Breadcrumb);