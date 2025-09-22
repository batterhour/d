import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());
const DOMAIN = "gproleague";
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljN2Y0ZTY4MTdjNDk5NjQyM2RhZDM1YTQ2NGMxNTcyZjU1YTY1NmFjNWRjODUzNWE3MTQxZGM4MGIyNjAxZmY3Mjk5OWJjNDFlYjAzMjI0In0.eyJhdWQiOiIwMTY2ZmVmMy03MDEzLTRmZjQtOTZiOC1kYmRiMzZkYWMwOWUiLCJqdGkiOiI5YzdmNGU2ODE3YzQ5OTY0MjNkYWQzNWE0NjRjMTU3MmY1NWE2NTZhYzVkYzg1MzVhNzE0MWRjODBiMjYwMWZmNzI5OTliYzQxZWIwMzIyNCIsImlhdCI6MTc1ODU1MDgxOSwibmJmIjoxNzU4NTUwODE5LCJleHAiOjE3NjQ4OTI4MDAsInN1YiI6IjEyOTg2NDM4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyNjY1MjU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwidXNlcl9mbGFncyI6MCwiaGFzaF91dWlkIjoiNWU2MTBkNGEtZjYyYy00NDhhLWE2NjktYzkzNjAyN2E5OTdjIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.n5RxopF46J74ygIhWuO6lwGqvLjvua8nOKerCctpD0zP4SldlLABgDnw8Ionmoqo_GZu5vCgWY-aOgx8kiAyyQWNOGFlTxbrOq2CmX3C43m5fNNNQR-fwz0T5vW5js1XSlk3CnmaL748uwloNDY1v918QZGWMejRmOd3V5gWFYkrPKYQqAGGbifCfUPyVQVLUIVI-UytZFcwkyPl15OzGElPgyze-XjFoegJOlPPrPJjQ_NCL6TgRnoQ4qxjpSLRSVCYEKst5s2VMNHSwp4uzLfICwN_lt3KLzPR9bcuf1QEYEdK1-7h60ivolj_krrxQOcXiM3KPcI8D48HtnQFrg";
const PIPELINE_ID = 10110086;
app.post("/api/v1/submit", async (req, res) => {
  const data = req.body;
  if (!data.phone)
    return res
      .status(400)
      .json({ success: false, message: "Телефон обязателен" });
  if (data.contactMethod?.includes("Email") && !data.email)
    return res
      .status(400)
      .json({ success: false, message: "Email обязателен" });
  try {
    const fieldsResp = await axios.get(
      `https://${DOMAIN}.amocrm.ru/api/v4/leads/custom_fields?with=values,enums&limit=250`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );
    const availableFields = fieldsResp.data._embedded?.custom_fields || [];
    const ourFieldIds = [
      1274195, 1274197, 1274209, 1274207, 1274203, 1274211, 1274213, 1274215,
    ];
    const availableFieldIds = availableFields.map((f) => f.id);
    const foundFields = ourFieldIds.filter((id) =>
      availableFieldIds.includes(id)
    );
    const customFieldsValues = [];
    if (foundFields.includes(1274195) && data.propertyType)
      customFieldsValues.push({
        field_id: 1274195,
        values: data.propertyType.map((v) => ({ value: v })),
      });
    if (foundFields.includes(1274197) && data.district)
      customFieldsValues.push({
        field_id: 1274197,
        values: data.district.map((v) => ({ value: v })),
      });
    if (foundFields.includes(1274209) && data.rooms)
      customFieldsValues.push({
        field_id: 1274209,
        values: data.rooms.map((v) => ({ value: v })),
      });
    if (foundFields.includes(1274207) && data.timeline)
      customFieldsValues.push({
        field_id: 1274207,
        values: [{ value: data.timeline }],
      });
    if (foundFields.includes(1274203) && data.budget)
      customFieldsValues.push({
        field_id: 1274203,
        values: [{ value: data.budget }],
      });
    if (foundFields.includes(1274211) && data.contactMethod)
      customFieldsValues.push({
        field_id: 1274211,
        values: data.contactMethod.map((v) => ({ value: v })),
      });
    if (foundFields.includes(1274213))
      customFieldsValues.push({
        field_id: 1274213,
        values: [{ value: data.phone }],
      });
    if (foundFields.includes(1274215) && data.email)
      customFieldsValues.push({
        field_id: 1274215,
        values: [{ value: data.email }],
      });
    const leadData = [
      {
        name: `Заявка с сайта от ${new Date().toLocaleDateString()}`,
        pipeline_id: PIPELINE_ID,
        custom_fields_values: customFieldsValues,
      },
    ];
    const leadResp = await axios.post(
      `https://${DOMAIN}.amocrm.ru/api/v4/leads`,
      leadData,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const leadId = leadResp.data._embedded.leads[0].id;
    const noteText = `Новая заявка:
Тип недвижимости: ${data.type}
Район: ${data.district}
Комнат: ${data.rooms}
Время покупки: ${data.purchase_time}
Бюджет: ${data.budget}
Способ связи: ${data.contact_methods}
Телефон: ${data.phone}
${data.email ? `Email: ${data.email}` : ""}`;
    await axios.post(
      `https://${DOMAIN}.amocrm.ru/api/v4/leads/notes`,
      [
        {
          entity_id: leadId,
          note_type: "common",
          params: { text: noteText },
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({
      success: true,
      leadId,
      message: "Данные успешно отправлены",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при отправке в amoCRM" });
  }
});

app.listen(PORT, () => {});
