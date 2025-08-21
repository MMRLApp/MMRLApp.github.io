---
editLink: false
prev: false
next: false
---

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import { VPLink, VPButton } from 'vitepress/theme'
import Dialog from '../../../components/Dialog.vue'
import markdownit from 'markdown-it'
const md = markdownit()

const { params } = useData()

const module = ref(params.value.module)

const readmeContent = ref("No README found.")
const showReadmeModal = ref(false)
const openModal = () => {
  document.body.style.overflow = "hidden";
  showReadmeModal.value = true;
};

const closeModal = () => {
  document.body.style.overflow = "unset";
  showReadmeModal.value = false;
};

const openScreenshot = (screenshot) => {
  window.open(screenshot, '_blank');
};

const formatFileSize = (bytes) => {
  if (!bytes) return 'Unknown';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

onMounted(()=> {
    if (!module.value.readme) return
    fetch(module.value.readme)
        .then((res)=> res.text())
        .then((text)=> {
            readmeContent.value = text
        })
})

const versions = computed(() => {
  return [...module.value.versions].reverse();
}); 

const latestVersion = computed(() => {
  return versions.value[0];
});
</script>

<img v-if="module.cover" :class="$style.moduleCover" :src="module.cover" :alt="`${module.name} cover image`"/>

<div :class="$style.moduleHeader">
    <h1 :class="$style.moduleTitle">
        <img v-if="module.icon" :class="$style.moduleIcon" :src="module.icon" :alt="`${module.name} icon`"/>
        <span :class="$style.moduleTitleText">{{ module.name }}</span>
    </h1>
    <div :class="$style.moduleMetaRow">
        <span :class="$style.author">by {{ module.author }}</span>
        <div :class="$style.badges">
            <span :class="[$style.chip, $style.chipInfo]">{{ module.version }}</span>
            <span :class="[$style.chip, $style.chipDanger]">{{ module.versionCode }}</span>
            <span v-if="module.verified" :class="[$style.chip, $style.chipGreen]">
                <svg :class="$style.verifiedIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z"/></svg>
                Verified
            </span>
        </div>
    </div>
</div>

<div v-if="module.note" :class="$style.noteContainer">
    <div class="note custom-block github-alert">
        <p class="custom-block-title">{{ module.note.title || "NOTE" }}</p>
        <p>{{ module.note.message }}</p>
    </div>
</div>

<div :class="$style.moduleDescription">
    {{ module.description }}
</div>

<div :class="$style.moduleActions">
    <VPButton 
        text="Download Latest" 
        size="medium" 
        target="_blank" 
        theme="brand" 
        :href="latestVersion.zipUrl"
        :class="$style.primaryAction"
    />
    <div :class="$style.secondaryActions">
        <VPButton 
            v-if="module.support" 
            :href="module.support" 
            target="_blank" 
            text="Get Support" 
            size="medium" 
            theme="alt" 
        />
        <VPButton 
            v-if="module.readme" 
            @click="openModal()" 
            text="View README" 
            size="medium" 
            theme="alt" 
        />
    </div>
</div>

<div v-if="module.screenshots && module.screenshots.length" :class="$style.screenshotsSection">
    <h2>Screenshots</h2>
    <div :class="$style.screenshotsContainer">
        <div 
            v-for="(screenshot, index) in module.screenshots" 
            :key="index" 
            :class="$style.screenshot"
            @click="openScreenshot(screenshot)"
        >
            <img :src="screenshot" :alt="`${module.name} Screenshot ${index + 1}`" />
            <div :class="$style.screenshotOverlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>
            </div>
        </div>
    </div>
</div>

<div v-if="module.track.antifeatures && module.track.antifeatures.length" :class="$style.antiFeaturesSection">
    <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9v4m-1.637-9.409L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0zM12 16h.01"/></svg>
        Anti-Features
    </h2>
    <p :class="$style.antiFeaturesDescription">This module contains the following anti-features that may affect your experience</p>
    <div :class="$style.antiFeaturesList">
        <div v-for="(af, index) in module.track.antifeatures" :key="index" :class="$style.antiFeatureItem">
            <VPLink :href="'/guide/antifeatures#' + af.toLowerCase()" target="_blank" color="blue" :class="$style.antiFeatureLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9v4m-1.637-9.409L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0zM12 16h.01"/></svg>
                {{ af }}
            </VPLink>
        </div>
    </div>
</div>

<div :class="$style.versionsSection">
    <h2>Available Versions</h2>
    <div :class="$style.versionsList">
        <div v-for="(version, index) in versions" :key="index" :class="$style.versionItem">
            <div :class="$style.versionInfo">
                <span :class="$style.versionNumber">{{ version.version }}</span>
                <span :class="$style.versionCode">({{ version.versionCode }})</span>
                <span v-if="index === 0" :class="[$style.chip, $style.chipGreen]">Latest</span>
            </div>
            <VPButton 
                :href="version.zipUrl" 
                target="_blank" 
                size="small" 
                theme="alt"
                :class="$style.versionDownload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7l7-7z"/>
                </svg>
            </VPButton>
        </div>
    </div>
</div>

<div :class="$style.moduleInfoSection">
    <h2>Module Information</h2>
    <div :class="$style.infoGrid">
        <div :class="$style.infoItem">
            <span :class="$style.infoLabel">License</span>
            <span :class="$style.infoValue">{{ module.license ?? "None" }}</span>
        </div>
        <div :class="$style.infoItem">
            <span :class="$style.infoLabel">Last Updated</span>
            <span :class="$style.infoValue">{{ new Date(module.timestamp * 1000).toLocaleDateString() }}</span>
        </div>
        <div v-if="module.size" :class="$style.infoItem">
            <span :class="$style.infoLabel">Download Size</span>
            <span :class="$style.infoValue">{{ formatFileSize(module.size) }}</span>
        </div>
        <div v-if="module.categories && module.categories.length" :class="$style.infoItem">
            <span :class="$style.infoLabel">Category</span>
            <span :class="$style.infoValue">{{ module.categories.join(', ') }}</span>
        </div>
    </div>
</div>

<Dialog :open="showReadmeModal" :onClose="closeModal" :onOpen="openModal" :contentStyle="{ padding: '16px 26px' }" title="README">
    <div class="vp-doc" v-html="md.render(readmeContent)" />
</Dialog>

<style scoped>
a {
    text-decoration: none !important;
}
h1, h2, h3 {
    border-top: none !important;
}
</style>

<style module>
/* Module Cover */
.moduleCover {
    width: 100% !important;
    aspect-ratio: 1024 / 500;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    margin-bottom: 2rem;
    display: block;
}

/* Fallback for browsers that don't support aspect-ratio */
@supports not (aspect-ratio: 1024 / 500) {
    .moduleCover {
        height: auto;
        max-height: 500px;
    }
}

.moduleCover:hover {
    transform: scale(1.01);
}

/* Module Header */
.moduleHeader {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
}

.moduleTitle {
    margin: 0 0 1rem 0 !important;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--vp-c-text-1);
    display: flex !important;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    max-width: 100%;
    overflow: hidden;
    word-wrap: break-word;
    hyphens: auto;
}

.moduleIcon {
    width: 5% !important;
    aspect-ratio: 1 !important;
    border-radius: 12px;
    flex-shrink: 0;
    min-width: 40px !important;
    max-width: 80px !important;
    height: auto !important;
    object-fit: cover;
    display: inline-block !important;
}

.moduleTitleText {
    flex: 1;
    min-width: 0;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
}

/* Fallback for browsers that don't support aspect-ratio */
@supports not (aspect-ratio: 1) {
    .moduleIcon {
        width: 60px !important;
        height: 60px !important;
    }
}

@media (max-width: 767px) {
    .moduleTitle {
        font-size: 2rem !important;
        gap: 0.5rem;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .moduleTitleText {
        font-size: 1.8rem;
        line-height: 1.1;
    }
    
    .moduleIcon {
        width: 8% !important;
        min-width: 35px !important;
        max-width: 60px !important;
        align-self: flex-start;
    }
    
    /* Fallback for mobile browsers that don't support aspect-ratio */
    @supports not (aspect-ratio: 1) {
        .moduleIcon {
            width: 45px !important;
            height: 45px !important;
        }
    }
}

.moduleMetaRow {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}

@media (min-width: 640px) {
    .moduleMetaRow {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}

.author {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
}

.warningBanner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background-color: var(--vp-badge-warning-bg);
    color: var(--vp-badge-warning-text);
    border: 1px solid var(--vp-badge-warning-border);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
}

.verifiedIcon {
    width: 16px;
    height: 16px;
}

/* Content Sections */
.noteContainer {
    margin: 1.5rem 0;
}

.moduleDescription {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--vp-c-text-1);
    margin: 1.5rem 0 2rem 0;
}

/* Action Buttons */
.moduleActions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
}

@media (min-width: 640px) {
    .moduleActions {
        flex-direction: row;
        align-items: center;
    }
}

.primaryAction {
    flex-shrink: 0;
}

.secondaryActions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

/* Screenshots */
.screenshotsSection {
    margin: 3rem 0;
}

.screenshotsContainer {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 1rem 0;
    scrollbar-width: thin;
    scrollbar-color: var(--vp-c-divider) transparent;
}

.screenshotsContainer::-webkit-scrollbar {
    height: 6px;
}

.screenshotsContainer::-webkit-scrollbar-track {
    background: transparent;
}

.screenshotsContainer::-webkit-scrollbar-thumb {
    background: var(--vp-c-divider);
    border-radius: 3px;
}

.screenshot {
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.screenshot:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.screenshot img {
    width: 250px;
    height: auto;
    display: block;
}

.screenshotOverlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    color: white;
}

.screenshot:hover .screenshotOverlay {
    opacity: 1;
}

/* Anti-Features */
.antiFeaturesSection {
    margin: 3rem 0;
    padding: 1.5rem;
    border: 1px solid var(--vp-badge-warning-border);
    border-radius: 12px;
    background-color: var(--vp-badge-warning-bg);
}

.antiFeaturesSection h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--vp-badge-warning-text);
    margin-top: 0;
    padding-top: 0;
}

.antiFeaturesDescription {
    color: var(--vp-badge-warning-text);
    margin: 1rem 0;
}

.antiFeaturesList {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.antiFeatureItem {
    display: flex;
    align-items: center;
}

.antiFeatureLink {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none !important;
    color: color-mix(in srgb, var(--vp-c-yellow-1) 80%, black) !important;
    font-weight: 500;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.antiFeatureLink:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Versions */
.versionsSection {
    margin: 3rem 0;
}

.versionsList {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.versionItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.2s ease, background-color 0.2s ease;
}

.versionItem:hover {
    border-color: var(--vp-c-brand-1);
    background-color: var(--vp-c-bg-alt);
}

.versionInfo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
}

.versionNumber {
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.versionCode {
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
}

.versionDownload {
    flex-shrink: 0;
}

/* Module Info */
.moduleInfoSection {
    margin: 3rem 0;
}

.infoGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.infoItem {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
}

.infoLabel {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--vp-c-text-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.infoValue {
    font-weight: 600;
    color: var(--vp-c-text-1);
}

/* Chip Styles */
.chipGreen {
    border: 1px solid transparent;
    color: var(--vp-c-green-1);
    background-color: color-mix(in srgb, var(--vp-c-green-1) 16%, transparent);
}

.chipInfo {
    border: 1px solid var(--vp-badge-info-border);
    color: var(--vp-badge-info-text);
    background-color: var(--vp-badge-info-bg);
}

.chipDanger {
    border: 1px solid var(--vp-badge-danger-border);
    color: var(--vp-badge-danger-text);
    background-color: var(--vp-badge-danger-bg);
}

.chip {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 12px;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    /* line-height: 1; */
}

/* Legacy styles for compatibility */
.moduleDetailsContainer {
    margin-top: 8px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
}

.details {
    flex-grow: 1;
    line-height: 24px;
    font-size: 13px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.feature {
    display: block;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
}

.box {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
}

.chipContainer {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding-top: 20px;
}

/* Force styles to ensure consistency */
.moduleCover[class] {
    width: 100% !important;
    display: block !important;
}

.moduleIcon[class] {
    display: inline-block !important;
    vertical-align: middle !important;
}

.moduleTitle[class] {
    display: flex !important;
    align-items: center !important;
}

/* Ensure images load properly */
.moduleCover,
.moduleIcon {
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: -webkit-optimize-contrast;
}

/* Additional text handling for very long module names */
@media (max-width: 480px) {
    .moduleTitleText {
        font-size: 1.5rem !important;
        line-height: 1.2;
        word-break: break-all;
    }
    
    .moduleTitle {
        gap: 0.4rem;
    }
}

/* Handle extremely long words */
.moduleTitleText {
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    word-spacing: -0.05em;
}
</style>
