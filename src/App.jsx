import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import {
  ArrowLeft, ArrowRight, Calculator, Check, ChevronDown, CircleCheck,
  Clock3, Factory, Hammer, HardHat, MapPin, Menu, MessageCircle,
  Phone, Ruler, ShieldCheck, Sparkles, Star, TableProperties, Truck,
  Trash2, Wrench, X, Send, TicketPercent,
} from 'lucide-react'
import { GlassCard, GlassCardContent, GlassCardFooter, GlassCardHeader } from './components/GlassCard.jsx'
import { ScrollReveal } from './components/ScrollReveal.jsx'

const services = [
  {
    icon: ShieldCheck,
    title: 'Гидроизоляция объектов',
    text: 'Защита фундаментов, кровель, резервуаров и подземных конструкций от воды и протечек.',
    tags: ['Фундаменты', 'Кровли', 'Резервуары'],
    image: '/images/portfolio-hydro/01-foundation-membrane.png',
  },
  {
    icon: Factory,
    title: 'Антикоррозионная защита',
    text: 'Подготовка и защитная обработка металлоконструкций, трубопроводов и промышленного оборудования.',
    tags: ['Металл', 'Трубопроводы', 'Покрытия'],
    image: '/images/portfolio-hydro/06-pipe-anticorrosion.png',
  },
  {
    icon: HardHat,
    title: 'Промышленная теплоизоляция',
    text: 'Изоляция трубопроводов, ёмкостей и инженерных систем с защитным покровным слоем.',
    tags: ['Оборудование', 'Трассы', 'Ёмкости'],
    image: '/images/portfolio-hydro/02-pipe-insulation.png',
  },
]

const projects = [
  { id: 1, category: 'Гидроизоляция', title: 'Фундамент объекта', task: 'Мембрана и герметизация узлов', image: '/images/portfolio-hydro/01-foundation-membrane.png' },
  { id: 2, category: 'Теплоизоляция', title: 'Трубопровод цеха', task: 'Минеральная вата и покровный слой', image: '/images/portfolio-hydro/02-pipe-insulation.png' },
  { id: 3, category: 'Инъектирование', title: 'Деформационный шов', task: 'Инъекционная гидроизоляция бетона', image: '/images/portfolio-hydro/03-joint-injection.png' },
  { id: 4, category: 'Резервуары', title: 'Защитное покрытие', task: 'Полимерная система по бетону', image: '/images/portfolio-hydro/04-reservoir-coating.png' },
  { id: 5, category: 'Кровля', title: 'Промышленная мембрана', task: 'Сварка полотен и герметизация узлов', image: '/images/portfolio-hydro/05-roof-membrane.png' },
  { id: 6, category: 'Антикор', title: 'Технологический трубопровод', task: 'Подготовка и защитная окраска', image: '/images/portfolio-hydro/06-pipe-anticorrosion.png' },
  { id: 7, category: 'Подземные сооружения', title: 'Инженерный тоннель', task: 'Мембрана, бентонит и проходки', image: '/images/portfolio-hydro/07-underground-waterproofing.png' },
  { id: 8, category: 'Герметизация', title: 'Проходки коммуникаций', task: 'Эластичные манжеты и контроль влажности', image: '/images/portfolio-hydro/08-pipe-penetrations.png' },
]

const navLinks = [
  ['top', 'О компании'], ['services', 'Услуги'], ['portfolio', 'Работы'],
  ['process', 'Этапы'], ['reviews', 'Отзывы'], ['contacts', 'Контакты'],
]

const advantages = [
  { icon: ShieldCheck, title: '5 лет гарантии', text: 'Условия закреплены в договоре.' },
  { icon: Trash2, title: 'Чистый объект', text: 'Защищаем рабочую зону и убираем её после работ.' },
  { icon: Factory, title: 'Проверенные материалы', text: 'Сертифицированные системы под условия объекта.' },
  { icon: Wrench, title: 'Промышленная команда', text: 'Допуски, техника безопасности и соблюдение регламентов.' },
]

const faq = [
  ['С какими объектами вы работаете?', 'Берём промышленные, коммерческие и частные объекты: кровли, фундаменты, резервуары, трубопроводы и технические помещения.'],
  ['Кто подбирает материалы?', 'Инженер подбирает систему после осмотра основания и условий эксплуатации. Материалы фиксируем в смете.'],
  ['Выезд на обследование платный?', 'В пределах города первичный выезд бесплатный при заключении договора.'],
  ['Работаете с юридическими лицами?', 'Да. Договор, безналичная оплата, закрывающие документы и гарантия.'],
]

function Button({ children, variant = 'dark', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', value => {
    setScrolled(value > 24)
    const marker = value + window.innerHeight * .32
    let current = 'top'
    navLinks.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section && section.offsetTop <= marker) current = id
    })
    setActive(current)
  })
  return (
    <motion.header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }}>
      <a href="#top" className="logo" aria-label="ГидроСпецИзоляция, главная">ГСИ<span>.</span></a>
      <nav aria-label="Навигация">
        {navLinks.map(([id, label]) => <a className={active === id ? 'active' : ''} href={`#${id}`} key={id}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="header-phone" href="tel:+79990000000"><Phone size={16} /><span>+7 999 000-00-00</span></a>
        <a className="button button-outline header-apply" href="#lead-form">Оставить заявку <ArrowRight size={17} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Открыть меню"><Menu /></button>
      </div>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" aria-label="Мобильная навигация" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{navLinks.map(([id, label]) => <a className={active === id ? 'active' : ''} onClick={() => setMenuOpen(false)} href={`#${id}`} key={id}>{label}</a>)}</motion.nav>}</AnimatePresence>
    </motion.header>
  )
}

function Hero() {
  const reduced = useReducedMotion()
  const parent = { hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .09, delayChildren: .18 } } }
  const child = { hidden: { opacity: 0, y: reduced ? 0 : 34 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : .68, ease: [.22, 1, .36, 1] } } }
  const heroServices = [
    [ShieldCheck, 'Гидроизоляция', 'Фундаменты, кровли и резервуары'],
    [Factory, 'Антикоррозионная защита', 'Металл и промышленное оборудование'],
    [HardHat, 'Теплоизоляция', 'Трубопроводы и инженерные системы'],
    [Wrench, 'Обследование и ремонт', 'Диагностика и локализация протечек'],
  ]
  return (
    <section className="hero-light" id="top">
      <img src="/images/hero-hydrospec-v2.png" className="hero-light-image" alt="Инженер осматривает промышленный нефтехимический комплекс" />
      <Header />
      <motion.div className="hero-content shell" variants={parent} initial="hidden" animate="visible">
        <motion.div className="hero-monogram hero-brand-word" variants={child}>ГИДРОСПЕЦИЗОЛЯЦИЯ</motion.div>
        <motion.h1 variants={child}>ПРОМЫШЛЕННАЯ<br />ЗАЩИТА ПОД КЛЮЧ</motion.h1>
        <motion.p variants={child}>Гидроизоляция, антикоррозионная защита и теплоизоляция промышленных объектов. Работаем по договору, выезжаем на обследование бесплатно.</motion.p>
        <motion.div className="hero-actions" variants={child}>
          <a className="button button-accent" href="#portfolio">Смотреть работы <ArrowRight size={18} /></a>
          <a className="button button-soft" href="#lead-form">Оставить заявку <ArrowRight size={18} /></a>
        </motion.div>
      </motion.div>
      <motion.div className="hero-service-strip shell" initial={{ opacity: 0, y: reduced ? 0 : 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .72, duration: reduced ? 0 : .65, ease: [.22,1,.36,1] }}>
        {heroServices.map(([Icon, title, text]) => <a href="#services" className="hero-service-card" key={title}><Icon /><div><strong>{title}</strong><span>{text}</span></div><ArrowRight /></a>)}
      </motion.div>
    </section>
  )
}

function Services() {
  return (
    <section className="section shell" id="services">
      <span id="about" className="anchor-target" />
      <ScrollReveal className="section-heading"><span>Три направления защиты</span><h2>Защищаем объект<br />от воды и коррозии.</h2><p>Один подрядчик отвечает за обследование, подбор системы, материалы и выполнение работ.</p></ScrollReveal>
      <div className="service-grid">
        {services.map(({ icon: Icon, ...service }, i) => (
          <ScrollReveal key={service.title} delay={i * .08}>
            <article className="service-card">
              <div className="service-image"><img src={service.image} alt="" loading="lazy" /><span>0{i + 1}</span></div>
              <div className="service-body"><Icon size={28} /><h3>{service.title}</h3><p>{service.text}</p><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
              <a className="service-cta" href="#lead-form">Оставить заявку <ArrowRight size={18} /></a>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const questions = [
    { title: 'Что нужно защитить?', key: 'type', options: ['Фундамент или кровлю', 'Металлоконструкции', 'Трубопровод или оборудование'] },
    { title: 'Есть обследование объекта?', key: 'project', options: ['Есть проект и дефектная ведомость', 'Есть фото и примерная площадь', 'Нужен выезд инженера'] },
    { title: 'Когда нужно начать работы?', key: 'date', options: ['Как можно быстрее', 'В течение месяца', 'Пока уточняю бюджет'] },
  ]
  const select = value => {
    setAnswers({ ...answers, [questions[step].key]: value })
    if (step < questions.length - 1) setStep(step + 1)
    else setDone(true)
  }

  return (
    <section className="quiz-section" id="calculator">
      <div className="shell quiz-shell">
        <ScrollReveal className="quiz-copy"><span>Оценка за 1 минуту</span><h2>Ответьте на три вопроса.</h2><p>Подготовим предварительный расчёт и организуем бесплатное обследование объекта.</p><div className="quiz-bonus"><Sparkles /><strong>Бонус</strong><span>Скидка 5% на первый объект</span></div></ScrollReveal>
        <GlassCard className="quiz-card">
          <div className="quiz-progress"><span>Шаг {done ? 4 : step + 1} из 4</span><div><i style={{ width: `${done ? 100 : ((step + 1) / 4) * 100}%` }} /></div></div>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -26 }} transition={{ duration: .25 }}>
                <h3>{questions[step].title}</h3>
                <div className="quiz-options">{questions[step].options.map(option => <button key={option} onClick={() => select(option)}><span>{option}</span><ArrowRight /></button>)}</div>
                {step > 0 && <button className="quiz-back" onClick={() => setStep(step - 1)}><ArrowLeft /> Назад</button>}
              </motion.div>
            ) : null}
            {done && (
              <motion.form key="contact" className="quiz-final" initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} onSubmit={e => e.preventDefault()}>
                <CircleCheck size={38} /><h3>Расчёт почти готов</h3><p>Оставьте телефон. Инженер уточнит условия объекта и назовёт диапазон стоимости.</p>
                <label>Телефон<input type="tel" placeholder="+7 999 000-00-00" required /></label><Button type="submit">Получить расчёт <ArrowRight /></Button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  )
}

function Portfolio() {
  const rows = [projects.slice(0, 4), projects.slice(4)]
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="shell portfolio-title"><ScrollReveal className="section-heading"><span>Выполненные объекты</span><h2>Защита конструкций<br />в реальных условиях.</h2><p>Наведите курсор на объект — покажем задачу и применённую систему защиты.</p></ScrollReveal></div>
      <div className="portfolio-marquee" aria-label="Карусель выполненных работ">
        {rows.map((row, rowIndex) => (
          <div className={`marquee-row ${rowIndex ? 'reverse' : ''}`} key={rowIndex}>
            <div className="marquee-track">
              {[0, 1, 2].map(group => <div className="marquee-group" aria-hidden={group > 0} key={group}>{row.map(project => (
                <figure className="marquee-card" key={`${group}-${project.id}`}>
                  <img src={project.image} alt={group === 0 ? project.title : ''} loading="lazy" />
                  <figcaption><span>{project.category}</span><strong>{project.title}</strong><small>{project.task}</small></figcaption>
                </figure>
              ))}</div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    ['Заявка', 'Уточняем задачу и изучаем документы.'], ['Обследование', 'Выезжаем, проверяем основание и узлы.'], ['Смета и договор', 'Фиксируем систему, стоимость и срок.'], ['Выполнение', 'Работаем по технологической карте.'], ['Сдача', 'Проверяем качество и передаём гарантию.'],
  ]
  return <section className="process-section" id="process"><div className="shell"><ScrollReveal className="section-heading"><span>Схема работы</span><h2>Пять контролируемых этапов.</h2></ScrollReveal><div className="process-line">{steps.map(([title, text], i) => <ScrollReveal className="process-step" delay={i * .07} key={title}><b>0{i + 1}</b><div><h3>{title}</h3><p>{text}</p></div><Check /></ScrollReveal>)}</div></div></section>
}

function Trust() {
  return <section className="section shell trust"><ScrollReveal className="section-heading"><span>Инженерный подход</span><h2>Защищаем надолго,<br />отвечаем по договору.</h2></ScrollReveal><div className="trust-grid">{advantages.map(({ icon: Icon, title, text }, i) => <ScrollReveal delay={i * .07} key={title}><GlassCard className="trust-card"><GlassCardHeader><Icon /><span>0{i + 1}</span></GlassCardHeader><GlassCardContent><h3>{title}</h3><p>{text}</p></GlassCardContent></GlassCard></ScrollReveal>)}</div></section>
}

function Reviews() {
  const reviews = [
    ['Алексей М.', 'Гидроизоляция фундамента', 'После обследования нашли источник протечки и устранили его без лишнего демонтажа. Смета не изменилась.'],
    ['Марина К.', 'Ремонт кровли', 'Подробно объяснили причину протечек, восстановили примыкания и проверили результат после дождя.'],
    ['ООО «Вектор»', 'Защита промышленного объекта', 'Работаем второй год. Документы и допуски в порядке, сроки соблюдают, качество покрытия стабильное.'],
  ]
  return <section className="reviews-section" id="reviews"><div className="shell"><div className="portfolio-head"><ScrollReveal className="section-heading"><span>Отзывы заказчиков</span><h2>Нам доверяют объекты.</h2></ScrollReveal><a className="map-rating" href="#contacts"><MapPin /> 4,9 на Яндекс Картах</a></div><div className="review-grid">{reviews.map(([name, work, text], i) => <ScrollReveal delay={i * .08} key={name}><GlassCard className="review-card"><div className="stars">{[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}</div><p>«{text}»</p><div><span className="avatar">{name[0]}</span><div><strong>{name}</strong><small>{work}</small></div></div></GlassCard></ScrollReveal>)}</div></div></section>
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return <section className="section shell faq"><ScrollReveal className="section-heading"><span>Частые вопросы</span><h2>Коротко о важном.</h2></ScrollReveal><div className="faq-list">{faq.map(([q, a], i) => <article className={open === i ? 'open' : ''} key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><ChevronDown /></button><AnimatePresence>{open === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a}</motion.p>}</AnimatePresence></article>)}</div></section>
}

function Contacts() {
  const [method, setMethod] = useState('Телефон')
  const [submitted, setSubmitted] = useState(false)
  const contactFields = {
    'Телефон': ['tel', '+7 (___) ___-__-__'],
    'Telegram': ['text', '@username'],
    'WhatsApp': ['tel', '+7 (___) ___-__-__'],
    'E-mail': ['email', 'mail@example.ru'],
  }
  const [fieldType, placeholder] = contactFields[method]
  const submitLead = event => {
    event.preventDefault()
    setSubmitted(true)
  }

  return <section className="contact-section" id="contacts"><div className="shell contact-grid"><ScrollReveal><span>Бесплатное обследование</span><h2>Изучим объект<br />и подберём решение.</h2><p>Инженер осмотрит основание, зафиксирует дефекты и предложит подходящую систему защиты.</p><div className="contact-buttons"><a href="tel:+79990000000" className="button button-light"><Phone /> +7 999 000-00-00</a><a href="#lead-form" className="button button-accent">Оставить заявку <ArrowRight /></a></div></ScrollReveal><ScrollReveal delay={.1}><GlassCard className="lead-card" id="lead-form">{submitted ? <motion.div className="lead-success" role="status" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><CircleCheck /><span>Готово</span><h3>ЗАЯВКА ОТПРАВЛЕНА</h3><p>Свяжемся выбранным способом и согласуем время бесплатного обследования.</p><Button type="button" variant="outline" onClick={() => setSubmitted(false)}>Отправить ещё одну</Button></motion.div> : <form onSubmit={submitLead}><GlassCardHeader><h3>Оставьте заявку на обследование объекта</h3><p>Заполните анкету — это займёт меньше минуты.</p></GlassCardHeader><GlassCardContent><label>Ваше имя<input name="name" placeholder="Иван" required /></label><fieldset className="contact-method"><legend>Удобный способ связи</legend><div>{Object.keys(contactFields).map(item => <label className={method === item ? 'active' : ''} key={item}><input type="radio" name="method" value={item} checked={method === item} onChange={() => setMethod(item)} />{item}</label>)}</div></fieldset><label>{method}<input name="contact" type={fieldType} placeholder={placeholder} required /></label><label>Промокод <small>(необязательно)</small><span className="promo-input"><TicketPercent /><input name="promo" placeholder="GSI-2026-XXXX" /></span></label><label className="consent"><input type="checkbox" required /><span>Согласен на обработку персональных данных</span></label></GlassCardContent><GlassCardFooter><Button type="submit">Получить консультацию <Send /></Button></GlassCardFooter></form>}</GlassCard></ScrollReveal></div><div className="shell contact-meta"><div><MapPin /><span>Москва, ул. Производственная, 10</span></div><div><Clock3 /><span>Пн–Сб, 08:00–20:00</span></div><div><ShieldCheck /><span>ИП Иванов И.И., ИНН 000000000000</span></div></div></section>
}

function CalculatorModal({ open, onClose }) {
  const [area, setArea] = useState(18)
  const [type, setType] = useState('Гидроизоляция')
  const [deadline, setDeadline] = useState('Стандартный срок')
  const rates = { 'Гидроизоляция': 2800, 'Антикоррозионная защита': 1900, 'Теплоизоляция': 2400 }
  const urgency = deadline === 'Срочно' ? 1.25 : 1
  const price = Math.max(15000, Math.round(area * rates[type] * urgency / 100) * 100)
  useEffect(() => {
    const close = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <AnimatePresence>{open && <motion.div className="modal-backdrop calculator-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && onClose()}><motion.div className="modal calculator-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }} transition={{ duration: .32, ease: [.22,1,.36,1] }}><button className="modal-close" onClick={onClose} aria-label="Закрыть"><X /></button><span>Калькулятор</span><h2 id="modal-title">Быстрый расчёт стоимости</h2><form onSubmit={e => e.preventDefault()}><label><span><Ruler size={19} /> Объём или площадь</span><input type="number" min="1" value={area} onChange={e => setArea(Number(e.target.value) || 1)} /></label><label><span><Hammer size={19} /> Тип работ</span><select value={type} onChange={e => setType(e.target.value)}><option>Гидроизоляция</option><option>Антикоррозионная защита</option><option>Теплоизоляция</option></select></label><label><span><Clock3 size={19} /> Срок выполнения</span><select value={deadline} onChange={e => setDeadline(e.target.value)}><option>Стандартный срок</option><option>Срочно</option><option>Пока узнаю цену</option></select></label><div className="price-preview"><span>Предварительно</span><strong>{price.toLocaleString('ru-RU')} ₽</strong><small>за объект площадью {area} м²</small></div><Button type="submit" variant="accent">Рассчитать стоимость <Calculator /></Button><small className="calculator-note">Стоимость обновляется сразу после выбора параметров</small></form></motion.div></motion.div>}</AnimatePresence>
}

function MessengerDock() {
  return <aside className="messenger-dock" aria-label="Написать в мессенджер"><span>Написать</span><a href="https://wa.me/79990000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="/images/logo-whatsapp.svg" alt="" /></a><a href="https://max.ru" target="_blank" rel="noreferrer" aria-label="MAX"><img src="/images/logo-max.svg" alt="" /></a><a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram"><img src="/images/logo-telegram.svg" alt="" /></a></aside>
}

function App() {
  return <><Hero /><main><Services /><Portfolio /><Process /><Trust /><Reviews /><FAQ /><Contacts /></main><footer id="privacy"><div className="shell footer-grid"><a href="#top" className="logo">ГСИ<span>.</span></a><p>Гидроизоляция и промышленная защита объектов под ключ.</p><div><a href="tel:+79990000000">+7 999 000-00-00</a><a href="#privacy">Политика конфиденциальности</a></div></div></footer><MessengerDock /></>
}

export default App
