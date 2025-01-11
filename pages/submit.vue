<script setup lang="ts">
import { ClientOnly } from '#components'
import SubmissionEditor from '../components/SubmissionEditor.vue';

const initialEditorContent = `## 👋 Welcome to Solofounders Editor

We're excited to hear your indie hacking journey!
Share your story and inspire others in the community.

Here's a simple guide to help you structure your post:

#### 🖊️ Title of Your Story

Start with a captivating title that summarizes your journey or achievement in a sentence.

#### ✍️ About You

Introduce yourself briefly:

- Who are you? (Name, background, interests)
- What do you work on?

#### 🚀 The Idea

Share the inspiration behind your project:

- How did you come up with the idea?
- What problem were you trying to solve?

#### 🛠️ Building the Project

Describe the development process:

- What tools or tech stack did you use?
- How long did it take to build?
- Share any challenges and how you overcame them.

#### 📈 Launch and Growth

Talk about bringing your project to life:

- How did you launch it?
- How did you market it or get users/customers?
- What’s your growth strategy?

#### 🎉 Big Wins and Lessons Learned

Reflect on your journey:

- What are your major achievements so far?
- What lessons did you learn?
- What would you do differently next time?

#### 📅 What’s Next?

Share your plans for the future:

- What are your next steps for the project?
- Are you looking for feedback, collaborators, or anything specific?

#### 🌟 Final Thoughts

Wrap it up with an inspirational message or advice for other indie hackers.

💡 Tips for Writing:

- Be authentic and honest. Share the highs _and_ the lows.
- Include visuals like screenshots, charts, or code snippets if possible.
- Keep it concise, but detailed enough to engage readers.

---

When you're ready, hit "Publish" and share your story with the SoloFounders community. 🎉
`

const colorMode = useColorMode()
</script>

<template>
  <h2 class="text-center font-bold text-2xl">
    solofounders story submission
  </h2>
  <p class="text-center ">
    before submission, make sure to read <a class="hover:underline" href="#">our rules of writing</a>;
  </p>
  <div class="article-content mx-auto container max-w-screen-xl mt-8">
    <ClientOnly >
      <input type="text" placeholder="Heading, e.g. 🚀 How we've scaled our AI SaaS from $0 to $50k MRR in 4 months!" class="input input-bordered bg-[#f2f2f2] dark:bg-[#262626] dark:focus:bg-[#262626] dark:focus:text-white w-full" />
      <SubmissionEditor class="mt-5" :initial-content="initialEditorContent" :theme="colorMode.value === 'dark' ? 'dark' : 'light'"/>
      <button class="mt-4 block mx-auto btn dark:btn-secondary">Submit the story!</button>
    </ClientOnly>
  </div>
</template>
