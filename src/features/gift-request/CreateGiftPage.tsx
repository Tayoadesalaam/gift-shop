import { useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router"
import {
  Button,
  Eyebrow,
  Field,
  Input,
  Select,
  Textarea,
} from "../../components/UI"

type GiftForm = {
  occasion: string
  occasionDate: string
  deliveryDate: string
  urgency: string
  flexible: string
  relationship: string
  recipientName: string
  ageRange: string
  interests: string
  traits: string
  favorites: string
  dislikes: string
  feeling: string
  styles: string
  personalization: string
  packaging: string
  avoid: string
  budget: string
  city: string
  state: string
  zip: string
  deliveryNotes: string
  customerName: string
  email: string
  phone: string
  contactChannel: string
  whatsappConsent: boolean
  marketingConsent: boolean
  termsAccepted: boolean
}

const emptyForm: GiftForm = {
  occasion: "",
  occasionDate: "",
  deliveryDate: "",
  urgency: "Planning ahead",
  flexible: "",
  relationship: "",
  recipientName: "",
  ageRange: "",
  interests: "",
  traits: "",
  favorites: "",
  dislikes: "",
  feeling: "",
  styles: "",
  personalization: "",
  packaging: "",
  avoid: "",
  budget: "",
  city: "",
  state: "",
  zip: "",
  deliveryNotes: "",
  customerName: "",
  email: "",
  phone: "",
  contactChannel: "Email",
  whatsappConsent: false,
  marketingConsent: false,
  termsAccepted: false,
}

const steps = [
  { name: "The moment", note: "Occasion & timing" },
  { name: "Their story", note: "The recipient" },
  { name: "What lights them up", note: "Personality & interests" },
  { name: "The feeling", note: "Style & meaning" },
  { name: "The practical bits", note: "Budget & delivery" },
  { name: "Stay in touch", note: "Your contact details" },
  { name: "One last look", note: "Review & submit" },
]

const choiceGroups: Record<string, string[]> = {
  occasion: [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Graduation",
    "Thank you",
    "Encouragement",
    "Apology",
    "Just because",
    "Something else",
  ],
  flexible: ["Yes, there’s some flexibility", "No, this date is important"],
  relationship: [
    "Partner",
    "Family member",
    "Friend",
    "Colleague",
    "Client",
    "Someone else",
  ],
  feeling: [
    "Loved",
    "Appreciated",
    "Celebrated",
    "Encouraged",
    "Surprised",
    "Understood",
    "Reconnected",
  ],
  packaging: [
    "Soft & romantic",
    "Minimal & refined",
    "Bright & joyful",
    "Natural & textural",
    "Surprise me",
  ],
}

function ChoiceGrid({
  options,
  value,
  onChange,
  compact = false,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  compact?: boolean
}) {
  return (
    <div className={`choice-grid ${compact ? "choice-grid-compact" : ""}`}>
      {options.map((option) => (
        <button
          type="button"
          className={
            value === option
              ? "choice-card choice-card-selected"
              : "choice-card"
          }
          onClick={() => onChange(option)}
          key={option}
        >
          <span>{option}</span>
          {value === option && <Check size={16} aria-hidden="true" />}
        </button>
      ))}
    </div>
  )
}

export default function CreateGiftPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<GiftForm>(() => {
    try {
      const saved = sessionStorage.getItem("aveline-gift-draft-v1")
      return saved ? { ...emptyForm, ...JSON.parse(saved) } : emptyForm
    } catch {
      return emptyForm
    }
  })
  const [error, setError] = useState("")
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    sessionStorage.setItem("aveline-gift-draft-v1", JSON.stringify(form))
  }, [form])

  const update = <K extends keyof GiftForm>(key: K, value: GiftForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setError("")
  }

  function validate() {
    if (
      step === 0 &&
      (!form.occasion || !form.deliveryDate || !form.flexible)
    ) {
      return "Choose an occasion, preferred delivery date, and whether the date is flexible."
    }
    if (step === 1 && !form.relationship)
      return "Tell us how you know the recipient."
    if (step === 2 && (!form.interests || !form.traits))
      return "Share at least a few interests and personality traits."
    if (step === 3 && !form.feeling)
      return "Choose the feeling you want this gift to create."
    if (
      step === 4 &&
      (!form.budget || !form.city || !form.state || !form.zip)
    ) {
      return "Choose a budget and add the destination city, state, and ZIP code."
    }
    if (step === 5 && (!form.customerName || !form.email))
      return "Add your name and email address."
    if (
      step === 5 &&
      form.contactChannel === "WhatsApp" &&
      (!form.phone || !form.whatsappConsent)
    ) {
      return "A phone number and WhatsApp consent are required when WhatsApp is selected."
    }
    if (step === 6 && !form.termsAccepted)
      return "Please acknowledge the Terms and Privacy Notice before submitting."
    return ""
  }

  function next() {
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setStep((current) => Math.min(current + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function back() {
    setError("")
    setStep((current) => Math.max(current - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function submit() {
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setSubmitError(true)
  }

  const progress = `${((step + 1) / steps.length) * 100}%`

  return (
    <section className="gift-flow">
      <div className="gift-flow-top">
        <div className="shell">
          <Link to="/" className="flow-brand">
            <Sparkles size={16} /> Aveline Gifts
          </Link>
          <div className="flow-security">
            <LockKeyhole size={15} /> Your details stay private
          </div>
        </div>
      </div>
      <div className="flow-progress">
        <div className="flow-progress-bar" style={{ width: progress }} />
      </div>
      <div className="shell gift-flow-shell">
        <aside className="step-sidebar">
          <Eyebrow>Your gift story</Eyebrow>
          <ol>
            {steps.map((item, index) => (
              <li
                className={
                  index === step ? "active" : index < step ? "complete" : ""
                }
                key={item.name}
              >
                <button
                  type="button"
                  onClick={() => index < step && setStep(index)}
                  disabled={index > step}
                >
                  <span>{index < step ? <Check size={14} /> : index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.note}</small>
                  </div>
                </button>
              </li>
            ))}
          </ol>
          <div className="draft-note">
            <ShieldCheck size={17} />
            <span>
              Your answers are saved in this browser tab while you work.
            </span>
          </div>
        </aside>

        <div className="step-main">
          <div className="mobile-step-label">
            Step {step + 1} of {steps.length}
          </div>
          {step === 0 && (
            <Step
              title="What are we celebrating?"
              copy="Let’s begin with the moment—and when it needs to arrive."
            >
              <Field label="The occasion" required>
                <ChoiceGrid
                  options={choiceGroups.occasion}
                  value={form.occasion}
                  onChange={(value) => update("occasion", value)}
                  compact
                />
              </Field>
              <div className="form-row">
                <Field
                  label="Occasion date"
                  hint="Optional, if different from delivery"
                >
                  <Input
                    type="date"
                    value={form.occasionDate}
                    onChange={(event) =>
                      update("occasionDate", event.target.value)
                    }
                  />
                </Field>
                <Field label="Preferred delivery date" required>
                  <Input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.deliveryDate}
                    onChange={(event) =>
                      update("deliveryDate", event.target.value)
                    }
                  />
                </Field>
              </div>
              <Field label="Is that date flexible?" required>
                <ChoiceGrid
                  options={choiceGroups.flexible}
                  value={form.flexible}
                  onChange={(value) => update("flexible", value)}
                />
              </Field>
              <Field label="How soon is this?">
                <Select
                  value={form.urgency}
                  onChange={(event) => update("urgency", event.target.value)}
                >
                  <option>Planning ahead</option>
                  <option>Within 3 weeks</option>
                  <option>Within 2 weeks</option>
                  <option>Within 7 days</option>
                </Select>
              </Field>
            </Step>
          )}

          {step === 1 && (
            <Step
              title="Tell us who they are."
              copy="Just enough to help us picture the person at the heart of this."
            >
              <Field label="How do you know them?" required>
                <ChoiceGrid
                  options={choiceGroups.relationship}
                  value={form.relationship}
                  onChange={(value) => update("relationship", value)}
                  compact
                />
              </Field>
              <div className="form-row">
                <Field label="Their first name or nickname" hint="Optional">
                  <Input
                    value={form.recipientName}
                    onChange={(event) =>
                      update("recipientName", event.target.value)
                    }
                    placeholder="e.g. Mia"
                  />
                </Field>
                <Field label="Age range" hint="Optional">
                  <Select
                    value={form.ageRange}
                    onChange={(event) => update("ageRange", event.target.value)}
                  >
                    <option value="">Choose a range</option>
                    <option>Under 18</option>
                    <option>18–24</option>
                    <option>25–34</option>
                    <option>35–44</option>
                    <option>45–54</option>
                    <option>55–64</option>
                    <option>65+</option>
                  </Select>
                </Field>
              </div>
              <div className="gentle-note">
                We only ask for a name if it will help with personalization. A
                full birth date is never needed.
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step
              title="What lights them up?"
              copy="The small details often lead to the most personal ideas."
            >
              <Field
                label="Hobbies and interests"
                hint="What can they happily talk about for hours?"
                required
              >
                <Textarea
                  rows={4}
                  value={form.interests}
                  onChange={(event) => update("interests", event.target.value)}
                  placeholder="e.g. Sunday gardening, old jazz records, baking for friends…"
                />
              </Field>
              <Field
                label="Their personality"
                hint="A few words that feel unmistakably them"
                required
              >
                <Textarea
                  rows={3}
                  value={form.traits}
                  onChange={(event) => update("traits", event.target.value)}
                  placeholder="e.g. quietly funny, curious, generous, detail-oriented…"
                />
              </Field>
              <div className="form-row">
                <Field
                  label="Favorite things"
                  hint="Colors, scents, places, treats…"
                >
                  <Textarea
                    rows={3}
                    value={form.favorites}
                    onChange={(event) =>
                      update("favorites", event.target.value)
                    }
                  />
                </Field>
                <Field label="Dislikes" hint="Anything they wouldn’t enjoy">
                  <Textarea
                    rows={3}
                    value={form.dislikes}
                    onChange={(event) => update("dislikes", event.target.value)}
                  />
                </Field>
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step
              title="How should it make them feel?"
              copy="Choose the emotion you most want the gift to carry."
            >
              <Field label="I want them to feel…" required>
                <ChoiceGrid
                  options={choiceGroups.feeling}
                  value={form.feeling}
                  onChange={(value) => update("feeling", value)}
                  compact
                />
              </Field>
              <Field
                label="Gift style or categories"
                hint="Optional—share ideas, or leave the curation to us"
              >
                <Textarea
                  rows={3}
                  value={form.styles}
                  onChange={(event) => update("styles", event.target.value)}
                  placeholder="e.g. a keepsake, something cozy, an experience, a collection of little luxuries…"
                />
              </Field>
              <Field
                label="Personalization ideas"
                hint="Names, dates, a phrase, a private joke…"
              >
                <Textarea
                  rows={3}
                  value={form.personalization}
                  onChange={(event) =>
                    update("personalization", event.target.value)
                  }
                />
              </Field>
              <Field label="Packaging mood">
                <ChoiceGrid
                  options={choiceGroups.packaging}
                  value={form.packaging}
                  onChange={(value) => update("packaging", value)}
                  compact
                />
              </Field>
              <Field label="Anything to avoid?" hint="Optional">
                <Input
                  value={form.avoid}
                  onChange={(event) => update("avoid", event.target.value)}
                />
              </Field>
            </Step>
          )}

          {step === 4 && (
            <Step
              title="A few practical details."
              copy="Your budget and destination help us recommend something genuinely right."
            >
              <Field label="Gift budget (USD)" required>
                <ChoiceGrid
                  options={[
                    "Under $75",
                    "$75–150",
                    "$150–300",
                    "$300–500",
                    "$500+",
                  ]}
                  value={form.budget}
                  onChange={(value) => update("budget", value)}
                  compact
                />
              </Field>
              <div className="form-row form-row-three">
                <Field label="Delivery city" required>
                  <Input
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(event) => update("city", event.target.value)}
                  />
                </Field>
                <Field label="State" required>
                  <Input
                    autoComplete="address-level1"
                    maxLength={2}
                    value={form.state}
                    onChange={(event) =>
                      update("state", event.target.value.toUpperCase())
                    }
                    placeholder="NY"
                  />
                </Field>
                <Field label="ZIP code" required>
                  <Input
                    autoComplete="postal-code"
                    inputMode="numeric"
                    value={form.zip}
                    onChange={(event) => update("zip", event.target.value)}
                  />
                </Field>
              </div>
              <div className="gentle-note">
                We don’t need a full street address yet. Location is used only
                to assess timing and delivery options.
              </div>
              <Field label="Delivery notes" hint="Optional">
                <Textarea
                  rows={3}
                  value={form.deliveryNotes}
                  onChange={(event) =>
                    update("deliveryNotes", event.target.value)
                  }
                  placeholder="Building access, timing notes, or anything else we should consider"
                />
              </Field>
            </Step>
          )}

          {step === 5 && (
            <Step
              title="How should we reach you?"
              copy="We’ll use these details only to discuss this request and its next steps."
            >
              <div className="form-row">
                <Field label="Your name" required>
                  <Input
                    autoComplete="name"
                    value={form.customerName}
                    onChange={(event) =>
                      update("customerName", event.target.value)
                    }
                  />
                </Field>
                <Field label="Email address" required>
                  <Input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </Field>
              </div>
              <Field
                label="Phone or WhatsApp number"
                hint={
                  form.contactChannel === "WhatsApp"
                    ? "Required for WhatsApp"
                    : "Optional"
                }
              >
                <Input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>
              <Field label="Preferred contact channel">
                <ChoiceGrid
                  options={["Email", "WhatsApp"]}
                  value={form.contactChannel}
                  onChange={(value) => update("contactChannel", value)}
                />
              </Field>
              {form.contactChannel === "WhatsApp" && (
                <Checkbox
                  checked={form.whatsappConsent}
                  onChange={(value) => update("whatsappConsent", value)}
                >
                  I agree to receive WhatsApp updates about this request.
                  Message and data rates may apply.
                </Checkbox>
              )}
              <Checkbox
                checked={form.marketingConsent}
                onChange={(value) => update("marketingConsent", value)}
              >
                I’d occasionally like to receive gifting inspiration and studio
                news. Optional.
              </Checkbox>
            </Step>
          )}

          {step === 6 && (
            <Step
              title="Your gift story, at a glance."
              copy="Take a moment to review the details. You can return to any section before submitting."
            >
              <div className="review-list">
                <ReviewBlock
                  title="The moment"
                  onEdit={() => setStep(0)}
                  rows={[
                    ["Occasion", form.occasion],
                    ["Preferred date", form.deliveryDate],
                    ["Timing", form.urgency],
                  ]}
                />
                <ReviewBlock
                  title="Their story"
                  onEdit={() => setStep(1)}
                  rows={[
                    ["Relationship", form.relationship],
                    ["Recipient", form.recipientName || "Not provided"],
                    ["Age range", form.ageRange || "Not provided"],
                  ]}
                />
                <ReviewBlock
                  title="Personality & interests"
                  onEdit={() => setStep(2)}
                  rows={[
                    ["Interests", form.interests],
                    ["Personality", form.traits],
                    ["Favorites", form.favorites || "Not provided"],
                  ]}
                />
                <ReviewBlock
                  title="Feeling & style"
                  onEdit={() => setStep(3)}
                  rows={[
                    ["Feeling", form.feeling],
                    ["Gift style", form.styles || "Curator’s choice"],
                    ["Packaging", form.packaging || "Curator’s choice"],
                  ]}
                />
                <ReviewBlock
                  title="Budget & destination"
                  onEdit={() => setStep(4)}
                  rows={[
                    ["Budget", form.budget],
                    ["Destination", `${form.city}, ${form.state} ${form.zip}`],
                  ]}
                />
                <ReviewBlock
                  title="Your details"
                  onEdit={() => setStep(5)}
                  rows={[
                    ["Name", form.customerName],
                    ["Email", form.email],
                    ["Preferred contact", form.contactChannel],
                  ]}
                />
              </div>
              <Checkbox
                checked={form.termsAccepted}
                onChange={(value) => update("termsAccepted", value)}
              >
                I acknowledge the{" "}
                <Link to="/terms" target="_blank">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" target="_blank">
                  Privacy Notice
                </Link>
                , and confirm the information I provided is appropriate to
                share.
              </Checkbox>
              {submitError && (
                <div className="form-alert" role="alert">
                  Secure request storage isn’t connected yet, so nothing was
                  submitted. Your draft is still saved in this tab.
                </div>
              )}
            </Step>
          )}

          {error && (
            <div className="form-alert" role="alert">
              {error}
            </div>
          )}
          <div className="flow-actions">
            {step > 0 ? (
              <Button variant="quiet" type="button" onClick={back}>
                <ArrowLeft size={17} /> Back
              </Button>
            ) : (
              <span />
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={next}>
                Continue <ArrowRight size={17} />
              </Button>
            ) : (
              <Button type="button" onClick={submit}>
                Submit gift request <ArrowRight size={17} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  title,
  copy,
  children,
}: {
  title: string
  copy: string
  children: React.ReactNode
}) {
  return (
    <div className="step-content">
      <div className="step-heading">
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      <div className="step-fields">{children}</div>
    </div>
  )
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  children: React.ReactNode
}) {
  return (
    <label className="checkbox-row">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{children}</span>
    </label>
  )
}

function ReviewBlock({
  title,
  rows,
  onEdit,
}: {
  title: string
  rows: [string, string][]
  onEdit: () => void
}) {
  const visibleRows = useMemo(() => rows.filter((row) => row[1]), [rows])
  return (
    <section className="review-block">
      <div className="review-heading">
        <h2>{title}</h2>
        <button type="button" onClick={onEdit}>
          <Pencil size={14} /> Edit
        </button>
      </div>
      <dl>
        {visibleRows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
