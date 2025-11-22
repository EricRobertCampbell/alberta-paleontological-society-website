import { c as createComponent, b as createAstro, m as maybeRenderHead, a as renderTemplate, d as addAttribute, h as renderSlot, r as renderComponent } from './astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { s as splitIsoString, g as generateEventDateTimeString } from './Layout_CYpN8CjO.mjs';
import { a as getEntry } from './_astro_content_kjL--9gh.mjs';
import 'clsx';
/* empty css                            */

function extractYouTubeVideoId(url) {
  if (!url) return null;
  const shortUrlMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&#]|$)/);
  if (shortUrlMatch) {
    return shortUrlMatch[1];
  }
  const watchUrlMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(?:[&#]|$)/);
  if (watchUrlMatch) {
    return watchUrlMatch[1];
  }
  const embedUrlMatch = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[?&#]|$)/);
  if (embedUrlMatch) {
    return embedUrlMatch[1];
  }
  return null;
}
function getYouTubeEmbedUrl(url) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

const $$Astro$1 = createAstro();
const $$Talk = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Talk;
  const { title, speaker, youtubeLink } = Astro2.props;
  const embedUrl = youtubeLink ? getYouTubeEmbedUrl(youtubeLink) : null;
  return renderTemplate`${maybeRenderHead()}<div class="talk-wrapper" data-astro-cid-bjjb3uxw> ${(title || speaker) && renderTemplate`<div class="talk-header" data-astro-cid-bjjb3uxw> ${title && renderTemplate`<h4 class="talk-title" data-astro-cid-bjjb3uxw>${title}</h4>`} ${speaker && renderTemplate`<p class="talk-speaker" data-astro-cid-bjjb3uxw>${speaker}</p>`} </div>`} ${embedUrl && renderTemplate`<div class="talk-video-wrapper" data-astro-cid-bjjb3uxw> <iframe class="talk-video"${addAttribute(embedUrl, "src")}${addAttribute(title || "YouTube video player", "title")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen data-astro-cid-bjjb3uxw></iframe> </div>`} </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Talk.astro", void 0);

const $$Astro = createAstro();
const $$Event = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Event;
  const { frontmatter, last, id, showPermalink = false, slug } = Astro2.props;
  const { title, startDate, endDate, type, image, start, end, host, detailsLink, talks } = frontmatter;
  const actualStartDate = start ? splitIsoString(start).date : startDate;
  const actualEndDate = end ? splitIsoString(end).date : endDate;
  const eventDateTimeString = generateEventDateTimeString({
    start,
    end,
    startDate,
    endDate
  });
  const resolvedTalks = talks ? await Promise.all(
    talks.map(async (talkRef) => {
      const talk = await getEntry("talks", talkRef);
      console.log({ talk });
      return talk;
    })
  ) : [];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")}${addAttribute(last ? [] : ["not-last"], "class:list")}${addAttribute(actualStartDate, "data-startdate")}${addAttribute(actualEndDate ? actualEndDate : actualStartDate, "data-enddate")} data-type="event" data-astro-cid-np5upjzn> <div class="event-header" data-astro-cid-np5upjzn> <div data-astro-cid-np5upjzn> <p class="event-type" data-astro-cid-np5upjzn> ${type}${host ? ` - hosted by ${host}` : ""} </p> <h3 class="event-title" data-astro-cid-np5upjzn>${title}</h3> <p class="event-time" data-astro-cid-np5upjzn> ${eventDateTimeString} </p> </div> ${showPermalink && slug && renderTemplate`<a${addAttribute(`/events/stable/${slug}`, "href")} class="permalink-button" data-astro-cid-np5upjzn>
Permalink
</a>`} </div> ${image && renderTemplate`<figure class="hero-figure" data-astro-cid-np5upjzn> <img class="event-hero-image"${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")} data-astro-cid-np5upjzn> ${image.attribution && renderTemplate`<figcaption data-astro-cid-np5upjzn>${image.attribution}</figcaption>`} </figure>`} <div class="content-container" data-astro-cid-np5upjzn> ${renderSlot($$result, $$slots["default"])} </div> ${detailsLink ? renderTemplate`<p data-astro-cid-np5upjzn>
For more details, see
<a${addAttribute(detailsLink, "href")} data-astro-cid-np5upjzn> ${detailsLink} </a>.</p>` : null} ${resolvedTalks && resolvedTalks.length > 0 && renderTemplate`<div class="talks-container" data-astro-cid-np5upjzn> ${resolvedTalks.map((talk) => renderTemplate`${renderComponent($$result, "Talk", $$Talk, { "title": talk.data.title, "speaker": talk.data.speaker, "youtubeLink": talk.data.youtubeLink, "data-astro-cid-np5upjzn": true })}`)} </div>`} </section> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Event.astro", void 0);

export { $$Event as $ };
