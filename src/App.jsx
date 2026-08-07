import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowDownRight, ArrowRight, Check, CircleGauge, Factory, Hammer,
  HardHat, MapPin, Menu, MessageCircle, MoveUpRight, ShieldCheck,
  Sparkles, Timer, Wrench,
} from 'lucide-react'

const services = [
  { icon: Sparkles, title: 'Сварочные работы', text: 'Аргон, полуавтомат, ручная сварка.' },
  { icon: Hammer, title: 'Кованые изделия', text: 'Заборы, ворота, перила, декор.' },
  { icon: Factory, title: 'Лофт-конструкции', text: 'Мебель, лестницы, каркасы.' },
  { icon: Wrench, title: 'Монтаж и установка', text: 'Аккуратно, точно и в срок.' },
]

const projects = [
  { image: '/images/project-gate.png', title: 'Откатные ворота', meta: 'Сталь · порошковая окраска', cls: 'project-wide' },
  { image: '/images/project-stairs.png', title: 'Лестница в лофт', meta: 'Сталь · массив дуба', cls: '' },
  { image: '/images/project-gate.png', title: 'Стальная пергола', meta: 'Проект · производство · монтаж', cls: 'project-crop-right' },
]

const steps = ['Заявка', 'Замер', 'Проект', 'Производство', 'Монтаж']

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={{ opacity: 0, y: reduce ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }} transition={{ duration: reduce ? 0 : .65, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  )
}

function ArrowButton({ label }) {
  return <button className="round-button" aria-label={label}><ArrowRight size={19} /></button>
}

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '13%'])
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -44])
  const opacity = useTransform(scrollYProgress, [0, .85], [1, .25])

  return (
    <section className="hero" ref={ref} id="top">
      <motion.img className="hero-image" src="/images/hero-welder.png" alt="Сварщик работает над стальной конструкцией в цехе" style={{ y: imageY }} />
      <div className="hero-shade" />
      <header className="nav shell">
        <a href="#top" className="logo" aria-label="СКЛ, главная">СКЛ<span>.</span></a>
        <nav aria-label="Основная навигация">
          <a href="#about">О компании</a><a href="#services">Услуги</a><a href="#works">Работы</a><a href="#process">Этапы</a><a href="#contact">Контакты</a>
        </nav>
        <div className="nav-actions"><a className="nav-chip" href="tel:+79990000000">Позвонить</a><button className="menu" aria-label="Открыть меню"><Menu /></button></div>
      </header>
      <motion.div className="hero-content shell" style={{ y: copyY, opacity }}>
        <p className="hero-index">Производство полного цикла</p>
        <h1><span>СКЛ</span><b>.</b></h1>
        <h2>Сварка, ковка,<br />лофт под ключ</h2>
        <p className="hero-copy">Изготавливаем металлические конструкции, мебель и изделия под ваш проект.</p>
        <div className="hero-cta">
          <a className="button button-light" href="#works">Смотреть работы <ArrowDownRight size={18} /></a>
          <a className="button button-glass" href="#contact">Обсудить проект <MoveUpRight size={18} /></a>
        </div>
      </motion.div>
      <div className="hero-stats">
        <div><strong>10+</strong><span>лет опыта</span></div><div><strong>300+</strong><span>проектов</span></div><div><strong>5 лет</strong><span>гарантии</span></div>
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <Hero />
      <main className="light-page">
        <section className="services shell" id="services" aria-label="Услуги">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal className="service-card glass-card" delay={i * .06} key={title}>
              <div className="icon-box"><Icon size={25} strokeWidth={1.7} /></div>
              <div><h3>{title}</h3><p>{text}</p></div><ArrowButton label={`Подробнее: ${title}`} />
            </Reveal>
          ))}
        </section>

        <section className="intro shell" id="about">
          <Reveal className="intro-title"><span>Своё производство</span><h2>Металл, который<br />служит десятилетиями.</h2></Reveal>
          <Reveal className="intro-copy" delay={.1}><p>Берём на себя весь путь: от идеи и точного замера до окраски и монтажа на объекте.</p><a href="#process">Как мы работаем <ArrowRight size={18} /></a></Reveal>
        </section>

        <section className="works shell" id="works">
          <div className="section-head"><h2>Наши работы</h2><a href="#contact">Рассчитать свой проект <ArrowRight size={18} /></a></div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <Reveal className={`project ${project.cls}`} delay={i * .08} key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-info"><div><h3>{project.title}</h3><p>{project.meta}</p></div><ArrowButton label={`Открыть проект: ${project.title}`} /></div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="benefits shell">
          <Reveal className="benefit-feature">
            <img src="/images/hero-welder.png" alt="Сварочное производство СКЛ" loading="lazy" />
            <div className="feature-shade" />
            <div className="feature-copy"><span>Собственный цех</span><h2>Видим качество<br />в каждом шве.</h2><p>Контроль металла, геометрии и финишной обработки на каждом этапе.</p></div>
            <a href="#contact" className="feature-link" aria-label="Обсудить производство"><MoveUpRight /></a>
          </Reveal>
          <div className="benefit-grid">
            <Reveal className="glass-card benefit"><ShieldCheck /><strong>5 лет</strong><span>гарантии по договору</span></Reveal>
            <Reveal className="glass-card benefit" delay={.05}><CircleGauge /><strong>±1 мм</strong><span>точность геометрии</span></Reveal>
            <Reveal className="glass-card benefit" delay={.1}><Timer /><strong>В срок</strong><span>фиксируем дату монтажа</span></Reveal>
            <Reveal className="glass-card benefit accent-benefit" delay={.15}><HardHat /><strong>Под ключ</strong><span>проектируем и ставим</span></Reveal>
          </div>
        </section>

        <section className="process shell" id="process">
          <div className="process-title"><span>Понятный процесс</span><h2>Пять шагов<br />до готового изделия</h2></div>
          <div className="steps">
            {steps.map((step, i) => <Reveal className="step" delay={i * .07} key={step}><b>0{i + 1}</b><span>{step}</span><Check size={18} /></Reveal>)}
          </div>
        </section>

        <section className="contact shell" id="contact">
          <Reveal className="contact-copy"><span>Есть задача?</span><h2>Обсудим идею.<br />Назовём честную цену.</h2><p>Ответим в течение рабочего дня.</p></Reveal>
          <Reveal className="contact-form" delay={.1}>
            <label>Ваше имя<input type="text" placeholder="Александр" /></label>
            <label>Телефон<input type="tel" placeholder="+7 999 000-00-00" /></label>
            <button className="button button-dark">Отправить заявку <ArrowRight size={18} /></button>
            <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</small>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="shell"><a className="logo" href="#top">СКЛ<span>.</span></a><p>Сварка, ковка, лофт-конструкции</p><div><a href="tel:+79990000000">+7 999 000-00-00</a><a href="#contact"><MapPin size={17} /> Москва и область</a><a href="#contact" aria-label="Написать нам"><MessageCircle size={18} /></a></div></div>
      </footer>
    </>
  )
}

export default App
