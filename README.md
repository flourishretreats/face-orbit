# Face Orbit

A tiny site that scans someone's face from every angle and sends the photos to a private gallery.

- `yoursite.netlify.app` — the link you send to anyone you want to scan. They type their name, pick a mode, follow the spoken cues, check the shots, and tap **Send to Gabe**.
- `yoursite.netlify.app/gallery.html` — your private gallery. Password protected. View every scan, download each one as a ZIP, delete old ones.

Photos are stored in Netlify Blobs on your Netlify account (free plan works). Nothing else to sign up for.

## Setup (about 5 minutes)

Netlify's drag-and-drop deploy can't run the photo storage part, so this goes through GitHub like your Flourish site.

1. **GitHub:** create a new repo called `face-orbit`. Click **Add file → Upload files** and drag in everything from this folder: `public`, `netlify`, `netlify.toml`, `package.json`, `README.md`. Commit.
2. **Netlify:** **Add new site → Import an existing project → GitHub** → pick `face-orbit`. Leave the build settings as they are (they're read from `netlify.toml`). Click **Deploy**.
3. **Set your gallery password:** in the new site, go to **Site configuration → Environment variables → Add a variable**. Key: `GALLERY_KEY`. Value: any password you want. Save.
4. **Redeploy** so the password takes effect: **Deploys → Trigger deploy → Deploy site**.
5. Optional: rename the site under **Site configuration → Change site name** (for example `vswrld-scan`), or point a subdomain like `scan.vswrld.com` at it.

## Using it

- Send anyone the main link. It needs to open in Safari (iPhone) or Chrome so the camera works. If they open it inside Instagram or another app's browser, tell them to tap "Open in Safari".
- Open `/gallery.html` on your phone or laptop, enter your password once (it's remembered on that device), and hit **Download ZIP** on any scan. That ZIP goes straight into Higgsfield.

## Scan types

People pick **Face** or **Full body** first. Each scan shows up in your gallery labeled with its type.

**Face**
- **I'm filming myself:** front camera. Head stays still while they sweep the phone left, right, above and below their face, then a head turn. About 36 shots.
- **Someone's filming me:** back camera, three slow laps around them (eye level, high, low). About 36 shots. Best quality, and the only face mode that gets the back of the head.

**Full body**
- **Phone on a tripod:** no helper needed. Phone at chest height, they step back into the body outline and tap Start. A 10-second countdown gives them time to get in place, then spoken cues walk them through front, both sides, back, arms out, and two slow full spins. About 42 shots.
- **Someone's filming me:** they stand still while a helper walks three laps around them, head to toe.

**Both:** upload photos or a video from the camera roll. A video gets split into evenly spaced shots (36 for face, 48 for body), keeping the sharpest frame near each one.

Every mode grabs the sharpest frame in each moment, so motion blur gets filtered out automatically. There's a **Flip camera** button before each scan starts, for using the front camera on a tripod so you can see yourself.
