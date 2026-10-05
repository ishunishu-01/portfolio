import './SkillCard.css';

const levelColors = {
  Expert:        { bar: 90, label: 'Expert'      },
  Advanced:      { bar: 75, label: 'Advanced'    },
  Intermediate:  { bar: 60, label: 'Intermediate'},
  Beginner:      { bar: 35, label: 'Beginner'    },
};

export default function SkillCard({ skill }) {
  const { name = '', category = '', level = 'Intermediate', icon = null } = skill;
  const info = levelColors[level] ?? levelColors.Intermediate;

  return (
    <div className="skill-card">
      <div className="skill-card__header">
        <div className="skill-card__icon-wrap">
          {icon ? (
            <img src={icon} alt={name} className="skill-card__icon-img" />
          ) : (
            <span className="skill-card__icon-text">{name.charAt(0)}</span>
          )}
        </div>
        <div className="skill-card__info">
          <h4 className="skill-card__name">{name}</h4>
          <span className="skill-card__category">{category}</span>
        </div>
        <span className={`skill-card__level-badge skill-card__level-badge--${level.toLowerCase()}`}>
          {info.label}
        </span>
      </div>

      <div className="skill-card__progress-track">
        <div
          className="skill-card__progress-bar"
          style={{ '--progress': `${info.bar}%` }}
        />
      </div>

      <div className="skill-card__footer">
        <span className="skill-card__percent">{info.bar}%</span>
        <div className="skill-card__dots">
          {[1,2,3,4,5].map(i => (
            <span
              key={i}
              className={`skill-card__dot ${i <= Math.ceil(info.bar / 20) ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
