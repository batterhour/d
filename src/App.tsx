import { useEffect, useState } from "react";
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
  const [phone_cont, set_phone_cont] = useState("");
  const [email, set_email] = useState("");
  const [error, e] = useState("");
  const [error2, e2] = useState("");
  const [success_send, s_s] = useState(false);
  const [success_send_phone, s_s_p] = useState(false);
  useEffect(() => {
    if (phone_cont.trim()) {
      e2("");
    }
  }, [phone_cont]);
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
  const act_next_phone = async () => {
    if (!phone_cont.trim()) {
      e2("Пожалуйста, введите номер телефона.");
      return;
    }

    try {
      const r = await axios.post("/api/v1/phone", { phone: phone_cont });
      if (r.data.success) {
        s_s_p(true);
        set_phone_cont("");
        e2("");
      } else {
        e2("Произошла ошибка при отправке. Попробуйте позже.");
      }
    } catch (err) {
      console.error(err);
      e2("Ошибка соединения. Попробуйте позже.");
    }
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
                  <div className={style.socials}>
                    <a href={import.meta.env.VITE_TELEGRAM_LINK}>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="url(#paint0_linear)"/>
<path d="M8.93822 25.174C11.7438 23.6286 14.8756 22.3388 17.8018 21.0424C22.836 18.919 27.8902 16.8324 32.9954 14.8898C33.9887 14.5588 35.7734 14.2351 35.9484 15.7071C35.8526 17.7907 35.4584 19.8621 35.188 21.9335C34.5017 26.4887 33.7085 31.0283 32.935 35.5685C32.6685 37.0808 30.774 37.8637 29.5618 36.8959C26.6486 34.9281 23.713 32.9795 20.837 30.9661C19.8949 30.0088 20.7685 28.6341 21.6099 27.9505C24.0093 25.5859 26.5539 23.5769 28.8279 21.0901C29.4413 19.6088 27.6289 20.8572 27.0311 21.2397C23.7463 23.5033 20.5419 25.9051 17.0787 27.8945C15.3097 28.8683 13.2479 28.0361 11.4797 27.4927C9.89428 26.8363 7.57106 26.175 8.93806 25.1741L8.93822 25.174Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear" x1="18.0028" y1="2.0016" x2="6.0028" y2="30" gradientUnits="userSpaceOnUse">
<stop stop-color="#37AEE2"/>
<stop offset="1" stop-color="#1E96C8"/>
</linearGradient>
</defs>
</svg>

                    </a>
                    <a href={import.meta.env.VITE_WHATSAPP_LINK}>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#25D366"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.7911 37.3525H24.7852C22.3967 37.3517 20.0498 36.7524 17.9653 35.6154L10.4 37.6L12.4246 30.2048C11.1757 28.0405 10.5186 25.5855 10.5196 23.0702C10.5228 15.2017 16.9248 8.79999 24.7909 8.79999C28.6086 8.80164 32.1918 10.2879 34.8862 12.9854C37.5806 15.6828 39.0636 19.2683 39.0621 23.0815C39.059 30.9483 32.6595 37.3493 24.7911 37.3525ZM18.3159 33.0319L18.749 33.2889C20.5702 34.3697 22.6578 34.9415 24.7863 34.9423H24.7911C31.3288 34.9423 36.6499 29.6211 36.6525 23.0807C36.6538 19.9112 35.4212 16.9311 33.1817 14.689C30.9422 12.4469 27.964 11.2115 24.7957 11.2104C18.2529 11.2104 12.9318 16.5311 12.9292 23.0711C12.9283 25.3124 13.5554 27.4951 14.7427 29.3836L15.0248 29.8324L13.8265 34.2095L18.3159 33.0319ZM31.4924 26.154C31.7411 26.2742 31.9091 26.3554 31.9808 26.4751C32.0699 26.6238 32.0699 27.3378 31.7729 28.1708C31.4756 29.0038 30.051 29.764 29.3659 29.8663C28.7516 29.9582 27.9741 29.9965 27.1199 29.725C26.602 29.5607 25.9379 29.3413 25.0871 28.9739C21.7442 27.5304 19.485 24.2904 19.058 23.678C19.0281 23.6351 19.0072 23.6051 18.9955 23.5895L18.9927 23.5857C18.804 23.3339 17.5395 21.6468 17.5395 19.9008C17.5395 18.2582 18.3463 17.3973 18.7177 17.001C18.7432 16.9739 18.7666 16.9489 18.7875 16.926C19.1144 16.569 19.5007 16.4797 19.7384 16.4797C19.9761 16.4797 20.2141 16.4819 20.4219 16.4924C20.4475 16.4937 20.4742 16.4935 20.5017 16.4933C20.7095 16.4921 20.9686 16.4906 21.2242 17.1045C21.3225 17.3407 21.4664 17.691 21.6181 18.0604C21.9249 18.8074 22.264 19.6328 22.3236 19.7522C22.4128 19.9307 22.4722 20.1389 22.3533 20.3769C22.3355 20.4126 22.319 20.4463 22.3032 20.4785C22.2139 20.6608 22.1483 20.7948 21.9967 20.9718C21.9372 21.0413 21.8756 21.1163 21.814 21.1913C21.6913 21.3407 21.5687 21.4901 21.4619 21.5965C21.2833 21.7743 21.0975 21.9672 21.3055 22.3242C21.5135 22.6812 22.2292 23.8489 23.2892 24.7945C24.4288 25.8109 25.4192 26.2405 25.9212 26.4582C26.0192 26.5008 26.0986 26.5352 26.1569 26.5644C26.5133 26.7429 26.7213 26.713 26.9294 26.4751C27.1374 26.2371 27.8208 25.4338 28.0584 25.0769C28.2961 24.7201 28.5339 24.7795 28.8607 24.8984C29.1877 25.0176 30.9408 25.8801 31.2974 26.0586C31.367 26.0934 31.4321 26.1249 31.4924 26.154Z" fill="#FDFDFD"/>
</svg>

                    </a>
                  </div>
                  <div className={style.hrs}>
                    <p>или введите номер и мы свяжемся с вами</p>
                  </div>
                  <div className={style.cont_send}>
                    <input
                      type="tel"
                      placeholder="+"
                      value={phone_cont}
                      onChange={(e) => set_phone_cont(e.target.value)}
                      className={style.modal_st_input}
                    />
                    <button
                      onClick={act_next_phone}
                      className={style.cont_send_button}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                  {error2 && <p className={style.modal_st_error}>{error2}</p>}
                  {success_send_phone && (
                    <p className={style.modal_st_s}>
                      Спасибо! Мы получили ваш номер и свяжемся с вами в
                      ближайшее время.
                    </p>
                  )}
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
