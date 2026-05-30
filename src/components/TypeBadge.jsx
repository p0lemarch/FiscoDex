import { useTranslation } from 'react-i18next';
import { TAX_TYPES } from '../data/taxes.js';

function TypeBadge({ type }) {
  const { t } = useTranslation();
  const typeInfo = TAX_TYPES[type];

  if (!typeInfo) return null;

  return (
    <span
      className="type-badge"
      style={{
        '--card-color': typeInfo.color,
        '--card-color-rgb': typeInfo.gradient[0] === '#F59E0B' ? '245, 158, 11' :
                            typeInfo.gradient[0] === '#6366F1' ? '99, 102, 241' :
                            typeInfo.gradient[0] === '#10B981' ? '16, 185, 129' :
                            typeInfo.gradient[0] === '#3B82F6' ? '59, 130, 246' :
                            typeInfo.gradient[0] === '#EF4444' ? '239, 68, 68' :
                            typeInfo.gradient[0] === '#F97316' ? '249, 115, 22' :
                            typeInfo.gradient[0] === '#FACC15' ? '250, 204, 21' :
                            typeInfo.gradient[0] === '#8B5CF6' ? '139, 92, 246' :
                            typeInfo.gradient[0] === '#EC4899' ? '236, 72, 153' :
                            typeInfo.gradient[0] === '#14B8A6' ? '20, 184, 166' :
                            '100, 116, 139',
      }}
    >
      <span className="type-badge__icon">{typeInfo.emoji}</span>
      <span>{t(typeInfo.labelKey)}</span>
    </span>
  );
}

export default TypeBadge;
