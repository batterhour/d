import { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowRight, PhoneCall } from "lucide-react";
import style from "./assets/styles/index.module.css";
type SData = {
  type?: string[];
  district?: string[];
  rooms?: string[];
  purchase_time?: string;
  budget?: string;
  contact_methods?: string[];
  phone?: string;
  email?: string;
};
const steps = [
  {
    title: "Выберите нужный тип недвижимости",
    field: "type",
    options: [
      "Все варианты",
      "Квартира",
      "Апартаменты",
      "Пентхаус",
      "Вилла",
      "Таунхаус",
    ],
    multiple: true,
  },
  {
    title: "Какой район предпочитаете?",
    field: "district",
    options: [
      "Любой/другое",
      "Dubai Marina",
      "Dubai Hills",
      "Palm Jumeirah",
      "Bluewaters",
      "Jumeirah Village Circle (JVC)",
      "Jumeirah Beach Residence (JBR)",
      "Business Bay",
      "Downtown",
      "Damac lagoons",
      "Emirates hills",
      "Damac hills",
      "Saadiyat Lagoons",
    ],
    multiple: true,
  },
  {
    title: "Сколько комнат вам необходимо?",
    field: "rooms",
    options: [
      "Студия",
      "1 комната",
      "2 комнаты",
      "3 комнаты",
      "4 комнаты и более",
    ],
    multiple: true,
  },
  {
    title: "Когда планируете покупку?",
    field: "purchase_time",
    options: [
      "В ближайшее время",
      "В течение месяца",
      "До трех месяцев",
      "В течение полугода",
      "В течение года, не спешу",
    ],
    multiple: false,
  },
  {
    title: "В пределах какого бюджета рассматриваете покупку?",
    field: "budget",
    options: [
      "200 000 - 350 000 $",
      "350 000 - 550 000 $",
      "550 000 - 700 000 $",
      "700 000 - 1 300 000 $",
      "Более 1 300 000 $",
    ],
    multiple: false,
  },
  {
    title: "Как вам удобнее получить подборку?",
    field: "contact_methods",
    options: ["WhatsApp", "Telegram", "Email"],
    multiple: true,
  },
];
function App() {
  const [open, set_open] = useState(false);
  const [step, set_step] = useState(0);
  const [data, set_data] = useState<SData>({});
  const [phone, set_phone] = useState("");
  const [email, set_email] = useState("");
  const [error, e] = useState("");
  const [success_send, s_s] = useState(false);
  const curr_step = steps[step];
  const option_change = (option: string) => {
    const field = curr_step.field as keyof SData;
    if (curr_step.multiple) {
      const current_values = (data[field] as string[]) || [];
      if (current_values.includes(option)) {
        set_data({
          ...data,
          [field]: current_values.filter((v) => v !== option),
        });
      } else {
        set_data({ ...data, [field]: [...current_values, option] });
      }
    } else {
      set_data({ ...data, [field]: option });
    }
    e("");
  };
  const act_next = async () => {
    const field = curr_step.field as keyof SData;
    const value = data[field];
    if (
      (curr_step.multiple && (!value || (value as string[]).length === 0)) ||
      (!curr_step.multiple && !value)
    ) {
      e("Пожалуйста, сделайте выбор.");
      return;
    }

    if (step === steps.length - 1) {
      if (!phone) {
        e("Телефон обязателен.");
        return;
      }
      if ((data.contact_methods?.includes("Email") ?? false) && !email) {
        e("Пожалуйста, укажите Email.");
        return;
      }
      const Data = { ...data, phone, email };
      console.debug(Data);
      try {
        const r = await axios.post("/api/v1/submit", Data);
        if (r.data.success) {
          s_s(true);
        } else {
          alert("Произошла ошибка при отправке. Попробуйте позже.");
        }
      } catch (err) {
        console.error(err);
      }
      set_step(0);
      set_data({});
      set_phone("");
      set_email("");
      e("");
      return;
    }
    set_step((prev) => prev + 1);
  };
  const act_back = () => {
    if (step > 0) set_step((prev) => prev - 1);
    e("");
  };
  const is_checked = (option: string) => {
    const field = curr_step.field as keyof SData;
    const value = data[field];
    if (curr_step.multiple) {
      return ((value as string[]) || []).includes(option);
    } else {
      return value === option;
    }
  };
  const il_step = step === steps.length - 1;
  return (
    <>
      <div className={style.background}>
        <div className={style.elements}>
          <h1>Элитные квартиры и виллы в Дубае</h1>
          <h3>от 200 000 $</h3>
          <p>Индивидуальный подбор объектов с учетом бюджета и предпочтений</p>
          <button
            onClick={() => set_open(true)}
            className={style.start_selection}
          >
            Начать подбор <ArrowRight />
          </button>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className={style.contact_me}>
                <PhoneCall /> Свяжитесь со мной
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className={style.modal_overlay} />
              <Dialog.Content className={style.modal_content}>
                <Dialog.Close asChild>
                  <button className={style.modal_close}>
                    <X />
                  </button>
                </Dialog.Close>

                <div className={style.modal_header}>
                  <h2>Контактная информация</h2>
                  <p>Свяжитесь с нами для индивидуального подбора объектов</p>
                </div>

                <div className={style.modal_body}>
                  <div className={style.modal_contact_item}>
                    <span>Имя:</span> <strong>WIZI PROPERTIES</strong>
                  </div>
                  <div className={style.contactItem}>
                    <span>Телефон:</span>{" "}
                    <a href="tel:+971504648630" className={style.phone_link}>
                      +971 50 464-8630
                    </a>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className={style.info}>
          <p>Адрес: WIZI PROPERTIES L.L.C Dubai Media City</p>
          <p>Al Salam Tower, The 26th Floor, Office 2608</p>
          <p>
            Телефон:{" "}
            <a className={style.phone} href="tel:+971504648630">
              +971 50 464-8630
            </a>
          </p>
        </div>
      </div>
      <Dialog.Root open={open} onOpenChange={set_open}>
        <Dialog.Portal>
          <Dialog.Overlay className={style.modal_st_overlay} />
          <Dialog.Content className={style.modal_st_content}>
            <Dialog.Close asChild>
              <button className={style.modal_st_close}>
                <X />
              </button>
            </Dialog.Close>

            <h2 className={style.modal_st_title}>{curr_step.title}</h2>

            <div className={style.modal_st_options}>
              {curr_step.options.map((opt) => (
                <label key={opt} className={style.modal_st_option_label}>
                  {curr_step.multiple ? (
                    <input
                      type="checkbox"
                      checked={is_checked(opt)}
                      onChange={() => option_change(opt)}
                      className={style.modal_st_checkbox}
                    />
                  ) : (
                    <input
                      type="radio"
                      name={curr_step.field}
                      checked={is_checked(opt)}
                      onChange={() => option_change(opt)}
                      className={style.modal_st_radio}
                    />
                  )}
                  {opt}
                </label>
              ))}
            </div>
            {il_step && (
              <>
                {data.contact_methods?.includes("Email") && (
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                    className={style.modal_st_input}
                  />
                )}
                <input
                  type="tel"
                  placeholder="+"
                  value={phone}
                  onChange={(e) => set_phone(e.target.value)}
                  className={style.modal_st_input}
                />
              </>
            )}
            {error && <p className={style.modal_st_error}>{error}</p>}

            <div className={style.modal_st_buttons}>
              {step > 0 && (
                <button onClick={act_back} className={style.modal_st_back}>
                  Назад
                </button>
              )}
              <button onClick={act_next} className={style.modal_st_next}>
                {il_step ? (
                  "Отправить"
                ) : (
                  <>
                    Далее <ArrowRight width={20} />
                  </>
                )}
              </button>
            </div>
            {success_send && (
              <p className={style.modal_st_s}>
                Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее
                время.
              </p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
export default App;
