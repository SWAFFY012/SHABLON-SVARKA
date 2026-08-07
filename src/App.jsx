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
    icon: Hammer,
    title: 'Сварочные работы',
    text: 'Навесы, заборы, ворота, лестницы, каркасы и ремонт металлоконструкций.',
    tags: ['Ворота', 'Навесы', 'Лестницы'],
    image: '/images/hero-welder.png',
  },
  {
    icon: HardHat,
    title: 'Кровельные работы',
    text: 'Монтаж и ремонт кровли, гидроизоляция, водостоки, профнастил и мягкая кровля.',
    tags: ['Монтаж', 'Ремонт', 'Водостоки'],
    image: '/images/project-gate.png',
  },
  {
    icon: TableProperties,
    title: 'Лофт-изделия',
    text: 'Перегородки, двери, столы, стеллажи и декор из металла и дерева.',
    tags: ['Мебель', 'Двери', 'Декор'],
    image: '/images/project-stairs.png',
  },
]

const projects = [
  { id: 1, category: 'Сварка', title: 'Откатные ворота', task: 'Сталь и порошковая окраска', image: '/images/portfolio-4k/01-sliding-gate.jpg' },
  { id: 2, category: 'Лофт', title: 'Обеденный стол', task: 'Сталь и массив дуба', image: '/images/portfolio-4k/02-loft-table.jpg' },
  { id: 3, category: 'Кровля', title: 'Фальцевая кровля', task: 'Кровля, водостоки и примыкания', image: '/images/portfolio-4k/03-metal-roof.jpg' },
  { id: 4, category: 'Лофт', title: 'Лестница в доме', task: 'Стальной каркас и дубовые ступени', image: '/images/portfolio-4k/04-steel-staircase.jpg' },
  { id: 5, category: 'Сварка', title: 'Цеховая сварка', task: 'Изготовление по рабочим чертежам', image: '/images/hero-welder.png' },
  { id: 6, category: 'Лофт', title: 'Лестница с ограждением', task: 'Точная геометрия и чистый монтаж', image: '/images/project-stairs.png' },
  { id: 7, category: 'Сварка', title: 'Ворота для участка', task: 'Производство и монтаж под ключ', image: '/images/project-gate.png' },
  { id: 8, category: 'Кровля', title: 'Монтаж металла', task: 'Аккуратные узлы и герметизация', image: '/images/hero-light.png' },
]

const navLinks = [
  ['top', 'О компании'], ['services', 'Услуги'], ['portfolio', 'Работы'],
  ['process', 'Этапы'], ['reviews', 'Отзывы'], ['contacts', 'Контакты'],
]

const advantages = [
  { icon: ShieldCheck, title: '5 лет гарантии', text: 'Условия закреплены в договоре.' },
  { icon: Trash2, title: 'Чистый объект', text: 'Собираем и вывозим мусор после монтажа.' },
  { icon: Factory, title: 'Свой цех', text: 'Цена без посредников и контроль качества.' },
  { icon: Wrench, title: 'Опытные мастера', text: 'Допуски, техника безопасности, точная геометрия.' },
]

const faq = [
  ['Какой минимальный заказ?', 'Берём заказы от 15 000 ₽. Небольшие работы оцениваем по фото или после осмотра.'],
  ['Кто закупает материалы?', 'Можем закупить сами по согласованной смете или работать с материалом заказчика.'],
  ['Выезд на замер платный?', 'В пределах города замер бесплатный при заключении договора.'],
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
      <a href="#top" className="logo" aria-label="СКЛ, главная">СКЛ<span>.</span></a>
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
    [Hammer, 'Сварочные работы', 'Надёжные сварные конструкции'],
    [Sparkles, 'Художественная ковка', 'Изделия ручной работы'],
    [TableProperties, 'Лофт-изделия', 'Мебель и элементы в стиле лофт'],
    [Truck, 'Монтаж и доставка', 'По Москве и области'],
  ]
  return (
    <section className="hero-light" id="top">
      <img src="/images/hero-light.png" className="hero-light-image" alt="Сварщик работает в светлом производственном цехе" />
      <Header />
      <motion.div className="hero-content shell" variants={parent} initial="hidden" animate="visible">
        <motion.div className="hero-monogram" variants={child}>СКЛ</motion.div>
        <motion.h1 variants={child}>Сварка, ковка,<br />лофт под ключ</motion.h1>
        <motion.p variants={child}>Металлические конструкции и изделия в стиле лофт. Работаем по договору, выезжаем на замер бесплатно.</motion.p>
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
      <ScrollReveal className="section-heading"><span>Три направления</span><h2>Делаем металл,<br />кровлю и лофт.</h2><p>Один подрядчик отвечает за замер, проект, производство и монтаж.</p></ScrollReveal>
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
    { title: 'Что нужно сделать?', key: 'type', options: ['Сварочные работы', 'Кровельные работы', 'Лофт-изделие'] },
    { title: 'Есть размеры или проект?', key: 'project', options: ['Есть чертёж и размеры', 'Есть примерные размеры', 'Нужен замер'] },
    { title: 'Когда нужен результат?', key: 'date', options: ['Как можно быстрее', 'В течение месяца', 'Пока узнаю стоимость'] },
  ]
  const select = value => {
    setAnswers({ ...answers, [questions[step].key]: value })
    if (step < questions.length - 1) setStep(step + 1)
    else setDone(true)
  }

  return (
    <section className="quiz-section" id="calculator">
      <div className="shell quiz-shell">
        <ScrollReveal className="quiz-copy"><span>Расчёт за 1 минуту</span><h2>Ответьте на три вопроса.</h2><p>Подготовим ориентировочную стоимость и подарим бесплатный замер.</p><div className="quiz-bonus"><Sparkles /><strong>Бонус</strong><span>Скидка 5% на первый заказ</span></div></ScrollReveal>
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
                <CircleCheck size={38} /><h3>Расчёт почти готов</h3><p>Оставьте телефон. Уточним детали и назовём диапазон цены.</p>
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
      <div className="shell portfolio-title"><ScrollReveal className="section-heading"><span>Выполненные проекты</span><h2>Реальные работы<br />наших мастеров.</h2><p>Наведите курсор на проект — покажем тип работы и материалы.</p></ScrollReveal></div>
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
    ['Заявка', 'Обсуждаем задачу и смотрим фото.'], ['Замер', 'Выезжаем, фиксируем размеры.'], ['Смета и договор', 'Цена, материалы и срок письменно.'], ['Производство', 'Изготавливаем в своём цехе.'], ['Сдача', 'Монтируем, убираем, даём гарантию.'],
  ]
  return <section className="process-section" id="process"><div className="shell"><ScrollReveal className="section-heading"><span>Схема работы</span><h2>Пять понятных шагов.</h2></ScrollReveal><div className="process-line">{steps.map(([title, text], i) => <ScrollReveal className="process-step" delay={i * .07} key={title}><b>0{i + 1}</b><div><h3>{title}</h3><p>{text}</p></div><Check /></ScrollReveal>)}</div></div></section>
}

function Trust() {
  return <section className="section shell trust"><ScrollReveal className="section-heading"><span>Без скрытых условий</span><h2>Работаем так,<br />как обещали.</h2></ScrollReveal><div className="trust-grid">{advantages.map(({ icon: Icon, title, text }, i) => <ScrollReveal delay={i * .07} key={title}><GlassCard className="trust-card"><GlassCardHeader><Icon /><span>0{i + 1}</span></GlassCardHeader><GlassCardContent><h3>{title}</h3><p>{text}</p></GlassCardContent></GlassCard></ScrollReveal>)}</div></section>
}

function Reviews() {
  const reviews = [
    ['Алексей М.', 'Откатные ворота', 'Смета не выросла ни на рубль. Установили за день, после себя всё убрали.'],
    ['Марина К.', 'Лестница в дом', 'Помогли упростить проект и сохранить внешний вид. Швы аккуратные, лестница не гуляет.'],
    ['ООО «Вектор»', 'Каркасы для производства', 'Работаем второй год. Документы вовремя, сроки соблюдают, качество стабильное.'],
  ]
  return <section className="reviews-section" id="reviews"><div className="shell"><div className="portfolio-head"><ScrollReveal className="section-heading"><span>Отзывы клиентов</span><h2>Нас рекомендуют.</h2></ScrollReveal><a className="map-rating" href="#contacts"><MapPin /> 4,9 на Яндекс Картах</a></div><div className="review-grid">{reviews.map(([name, work, text], i) => <ScrollReveal delay={i * .08} key={name}><GlassCard className="review-card"><div className="stars">{[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}</div><p>«{text}»</p><div><span className="avatar">{name[0]}</span><div><strong>{name}</strong><small>{work}</small></div></div></GlassCard></ScrollReveal>)}</div></div></section>
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

  return <section className="contact-section" id="contacts"><div className="shell contact-grid"><ScrollReveal><span>Бесплатный замер</span><h2>Обсудим задачу<br />и назовём цену.</h2><p>Мастер приедет в удобное время, снимет размеры и покажет материалы.</p><div className="contact-buttons"><a href="tel:+79990000000" className="button button-light"><Phone /> +7 999 000-00-00</a><a href="#lead-form" className="button button-accent">Оставить заявку <ArrowRight /></a></div></ScrollReveal><ScrollReveal delay={.1}><GlassCard className="lead-card" id="lead-form">{submitted ? <motion.div className="lead-success" role="status" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><CircleCheck /><span>Готово</span><h3>ЗАЯВКА ОТПРАВЛЕНА</h3><p>Свяжемся выбранным способом и согласуем время бесплатного замера.</p><Button type="button" variant="outline" onClick={() => setSubmitted(false)}>Отправить ещё одну</Button></motion.div> : <form onSubmit={submitLead}><GlassCardHeader><h3>Оставьте заявку на бесплатный замер</h3><p>Заполните анкету — это займёт меньше минуты.</p></GlassCardHeader><GlassCardContent><label>Ваше имя<input name="name" placeholder="Иван" required /></label><fieldset className="contact-method"><legend>Удобный способ связи</legend><div>{Object.keys(contactFields).map(item => <label className={method === item ? 'active' : ''} key={item}><input type="radio" name="method" value={item} checked={method === item} onChange={() => setMethod(item)} />{item}</label>)}</div></fieldset><label>{method}<input name="contact" type={fieldType} placeholder={placeholder} required /></label><label>Промокод <small>(необязательно)</small><span className="promo-input"><TicketPercent /><input name="promo" placeholder="SKL-2026-XXXX" /></span></label><label className="consent"><input type="checkbox" required /><span>Согласен на обработку персональных данных</span></label></GlassCardContent><GlassCardFooter><Button type="submit">Получить консультацию <Send /></Button></GlassCardFooter></form>}</GlassCard></ScrollReveal></div><div className="shell contact-meta"><div><MapPin /><span>Москва, ул. Производственная, 10</span></div><div><Clock3 /><span>Пн–Сб, 08:00–20:00</span></div><div><ShieldCheck /><span>ИП Иванов И.И., ИНН 000000000000</span></div></div></section>
}

function CalculatorModal({ open, onClose }) {
  const [area, setArea] = useState(18)
  const [type, setType] = useState('Сварочные работы')
  const [deadline, setDeadline] = useState('Стандартный срок')
  const rates = { 'Сварочные работы': 6500, 'Кровельные работы': 4800, 'Лофт-изделие': 8200 }
  const urgency = deadline === 'Срочно' ? 1.25 : 1
  const price = Math.max(15000, Math.round(area * rates[type] * urgency / 100) * 100)
  useEffect(() => {
    const close = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <AnimatePresence>{open && <motion.div className="modal-backdrop calculator-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && onClose()}><motion.div className="modal calculator-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }} transition={{ duration: .32, ease: [.22,1,.36,1] }}><button className="modal-close" onClick={onClose} aria-label="Закрыть"><X /></button><span>Калькулятор</span><h2 id="modal-title">Быстрый расчёт стоимости</h2><form onSubmit={e => e.preventDefault()}><label><span><Ruler size={19} /> Объём или площадь</span><input type="number" min="1" value={area} onChange={e => setArea(Number(e.target.value) || 1)} /></label><label><span><Hammer size={19} /> Тип работ</span><select value={type} onChange={e => setType(e.target.value)}><option>Сварочные работы</option><option>Кровельные работы</option><option>Лофт-изделие</option></select></label><label><span><Clock3 size={19} /> Срок выполнения</span><select value={deadline} onChange={e => setDeadline(e.target.value)}><option>Стандартный срок</option><option>Срочно</option><option>Пока узнаю цену</option></select></label><div className="price-preview"><span>Предварительно</span><strong>{price.toLocaleString('ru-RU')} ₽</strong><small>за проект объёмом {area} м²</small></div><Button type="submit" variant="accent">Рассчитать стоимость <Calculator /></Button><small className="calculator-note">Стоимость обновляется сразу после выбора параметров</small></form></motion.div></motion.div>}</AnimatePresence>
}

function MessengerDock() {
  return <aside className="messenger-dock" aria-label="Написать в мессенджер"><span>Написать</span><a href="https://wa.me/79990000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="/images/logo-whatsapp.svg" alt="" /></a><a href="https://max.ru" target="_blank" rel="noreferrer" aria-label="MAX"><img src="/images/logo-max.svg" alt="" /></a><a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram"><img src="/images/logo-telegram.svg" alt="" /></a></aside>
}

function App() {
  return <><Hero /><main><Services /><Portfolio /><Process /><Trust /><Reviews /><FAQ /><Contacts /></main><footer id="privacy"><div className="shell footer-grid"><a href="#top" className="logo">СКЛ<span>.</span></a><p>Сварка, кровля и лофт-конструкции под ключ.</p><div><a href="tel:+79990000000">+7 999 000-00-00</a><a href="#privacy">Политика конфиденциальности</a></div></div></footer><MessengerDock /></>
}

export default App
