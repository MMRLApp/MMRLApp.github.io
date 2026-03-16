---MMRLApp.github.io/ documentos/ es/ guía
/
how-a-module-card-works.md
en
maestro
title: How a Module Card Works
descriptions: Here will you learn how the module card works in MMRL
---

# How a Module Card Works

You'll see two differnet module cards below, what do you notice?

<table tabindex="0">
    <thead>
        <tr>
            <th>Module that uses Action and WebUI</th>
            <th>Module that not uses Action or WebUI</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <img src="/assets/general/Module-Card-1.webp">
            </td>
            <td>
                <img src="/assets/general/Module-Card-2.webp">
            </td>
        </tr>
        <tr>
            <td>
                <ol>
                    <li>Action button. By clicking this button you run the modules' action script</li>
                    <li>The button to update your module</li>
                    <li>The button to remove your module</li>
                    <li>The button to disable your module</li>
                    <li>This icon indicates if a module has a WebUI. By clicking the card you'll enter the modules' WebUI</li>
                </ol>
            </td>
            <td>
                <ol>
                    <s :style="{color: 'var(--vp-code-line-number-color)'}"><li>Action button. By clicking this button you run the modules' action script</li></s>
                    <li>The button to update your module</li>
                    <li>The button to remove your module</li>
                    <li>The button to disable your module</li>
                    <s :style="{color: 'var(--vp-code-line-number-color)'}"><li>This icon indicates if a module has a WebUI. By clicking the card you'll enter the modules' WebUI</li></s>
                </ol>
            </td>
        </tr>
    </tbody>
</table>
