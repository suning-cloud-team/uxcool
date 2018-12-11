<template>
  <div class="mume markdown-preview">
    <h2 class="mume-header"
        id="api">API</h2>

    <h3 class="mume-header"
        id="uxtag">UxTag</h3>

    <h4 class="mume-header"
        id="props">Props</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>color</td>
          <td>tag &#x989C;&#x8272;</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>closable</td>
          <td>&#x662F;&#x5426;&#x53EF;&#x5173;&#x95ED;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>on-before-close</td>
          <td>&#x5173;&#x95ED;&#x524D;&#x94A9;&#x5B50;</td>
          <td>Function(e)=&gt;Boolean|Promise</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="events">Events</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x4E8B;&#x4EF6;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>close</td>
          <td>tag &#x5173;&#x95ED;&#x540E;&#x89E6;&#x53D1;</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>after-close</td>
          <td>tag &#x5173;&#x95ED;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x540E;&#x89E6;&#x53D1;</td>
          <td>Function()</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxcheckabletag">UxCheckableTag</h3>

    <h4 class="mume-header"
        id="props-1">Props</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>checked</td>
          <td>&#x662F;&#x5426;&#x9009;&#x4E2D;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="events-1">Events</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x4E8B;&#x4EF6;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>change</td>
          <td>checked &#x53D8;&#x5316;&#x65F6;&#x89E6;&#x53D1;</td>
          <td>Function(checked)</td>
        </tr>
      </tbody>
    </table>

  </div>

</template>
