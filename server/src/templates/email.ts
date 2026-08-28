import process from 'node:process'

type ContactPayload = {
  name: string
  email: string
  company?: string | null
  budget?: string | null
  message: string
  requestId: number
}

const SITE = 'www.fixconnexion.com'

export function autoReplyEmail({ name, requestId }: ContactPayload) {
  const subject = `Fixconnexion - bien recu, on revient vers vous sous 24h`
  const text = [
    `Bonjour ${name.split(' ')[0]},`,
    '',
    'Merci pour votre message. Nous l\'avons bien recu et notre equipe revient vers vous sous 24h ouvrables.',
    '',
    `Reference de votre demande : #${requestId}`,
    '',
    'A tres vite,',
    'L\'equipe Fixconnexion',
    SITE,
  ].join('\n')

  const html = `<!doctype html>
<html><body style="font-family:Inter,-apple-system,sans-serif;background:#05060A;color:#fff;padding:40px 20px;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#0A0B12;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px">
    <div style="font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:600;background:linear-gradient(135deg,#5BC0FF,#C5FF4A);-webkit-background-clip:text;background-clip:text;color:transparent">Fixconnexion</div>
    <h1 style="font-size:22px;font-weight:600;margin:24px 0 12px;color:#fff">Bonjour ${escape(name.split(' ')[0])}</h1>
    <p style="color:rgba(255,255,255,0.7);line-height:1.6;margin:0 0 16px">Merci pour votre message. Nous l'avons bien recu et notre equipe revient vers vous sous <strong style="color:#C5FF4A">24h ouvrables</strong>.</p>
    <div style="background:rgba(91,192,255,0.08);border:1px solid rgba(91,192,255,0.2);border-radius:10px;padding:14px 18px;margin:24px 0;font-family:JetBrains Mono,monospace;font-size:13px;color:#5BC0FF">
      Reference : #${requestId}
    </div>
    <p style="color:rgba(255,255,255,0.55);font-size:14px;line-height:1.6">A tres vite,<br>L'equipe Fixconnexion</p>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0">
    <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0"><a href="https://${SITE}" style="color:rgba(91,192,255,0.7);text-decoration:none">${SITE}</a></p>
  </div>
</body></html>`

  return { subject, text, html }
}

export function notifyTeamEmail(payload: ContactPayload) {
  const subject = `Nouvelle demande #${payload.requestId} - ${payload.name}${payload.company ? ' (' + payload.company + ')' : ''}`
  const lines = [
    `Nouvelle demande recue sur le site.`,
    '',
    `Nom       : ${payload.name}`,
    `Email     : ${payload.email}`,
    `Societe   : ${payload.company || '-'}`,
    `Budget    : ${payload.budget || '-'}`,
    `Reference : #${payload.requestId}`,
    '',
    '--- Message ---',
    payload.message,
    '',
    '---',
    `Ouvrir le dashboard admin : ${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/requests/${payload.requestId}`,
  ]
  const text = lines.join('\n')
  const html = `<!doctype html>
<html><body style="font-family:Inter,sans-serif;background:#05060A;color:#fff;padding:40px 20px;margin:0">
  <div style="max-width:600px;margin:0 auto;background:#0A0B12;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px">
    <h1 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#fff">Nouvelle demande</h1>
    <p style="color:rgba(255,255,255,0.5);font-family:JetBrains Mono,monospace;font-size:12px;margin:0 0 24px">Reference #${payload.requestId}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;width:120px">Nom</td><td style="color:#fff;padding:6px 0">${escape(payload.name)}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0">Email</td><td style="padding:6px 0"><a href="mailto:${escape(payload.email)}" style="color:#5BC0FF">${escape(payload.email)}</a></td></tr>
      <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0">Societe</td><td style="color:#fff;padding:6px 0">${escape(payload.company || '-')}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0">Budget</td><td style="color:#C5FF4A;padding:6px 0">${escape(payload.budget || '-')}</td></tr>
    </table>
    <div style="background:rgba(255,255,255,0.03);border-left:3px solid #5BC0FF;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;white-space:pre-wrap;color:rgba(255,255,255,0.85);font-size:14px;line-height:1.6">${escape(payload.message)}</div>
    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/requests/${payload.requestId}" style="display:inline-block;background:#C5FF4A;color:#05060A;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Ouvrir dans le dashboard</a>
  </div>
</body></html>`
  return { subject, text, html }
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
