<template>
  <div class="mume markdown-preview   ">
    <h2 class="mume-header"
        id="api">API</h2>

    <h3 class="mume-header"
        id="uxdrawer">UxDrawer</h3>

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
          <td>visible</td>
          <td>&#x662F;&#x5426;&#x53EF;&#x89C1;(v-model)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placement</td>
          <td>&#x5C55;&#x793A;&#x4F4D;&#x7F6E; ,&#x53EF;&#x9009;&#x503C;: <code>top</code>,<code>left</code>,<code>right</code>,<code>bottom</code></td>
          <td>String</td>
          <td>&apos;right&apos;</td>
        </tr>
        <tr>
          <td>get-container</td>
          <td><code>drawer</code>&#x6302;&#x8F7D;&#x4F4D;&#x7F6E;</td>
          <td>Function=&gt;HTMLElement</td>
          <td>document.body</td>
        </tr>
        <tr>
          <td>show-mask</td>
          <td>&#x662F;&#x5426;&#x663E;&#x793A;&#x906E;&#x7F69;</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>mask-style</td>
          <td>&#x81EA;&#x5B9A;&#x4E49;&#x906E;&#x7F69;&#x6837;&#x5F0F;</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>mask-closable</td>
          <td>&#x70B9;&#x51FB;&#x906E;&#x7F69;&#x662F;&#x5426;&#x5173;&#x95ED;&#x7EC4;&#x4EF6;</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>wrapper-class</td>
          <td>&#x5916;&#x5C42;&#x5BB9;&#x5668;&#x7C7B;&#x540D;</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>width</td>
          <td>&#x5BBD;&#x5EA6;,&#x5F53;<code>placement</code>&#x4E3A;<code>left</code>,<code>right</code>&#x65F6;&#x6709;&#x6548;</td>
          <td>String|Number</td>
          <td>256</td>
        </tr>
        <tr>
          <td>height</td>
          <td>&#x9AD8;&#x5EA6;,,&#x5F53;<code>placement</code>&#x4E3A;<code>top</code>,<code>bottom</code>&#x65F6;&#x6709;&#x6548;</td>
          <td>String|Number</td>
          <td>256</td>
        </tr>
        <tr>
          <td>destroy-on-close</td>
          <td>&#x5173;&#x95ED;&#x65F6;&#x9500;&#x6BC1;&#x7EC4;&#x4EF6;&#x5185;&#x5B50;&#x5143;&#x7D20;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>title</td>
          <td>&#x6807;&#x9898;</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>closable</td>
          <td>&#x662F;&#x5426;&#x663E;&#x793A;&#x53F3;&#x4E0A;&#x89D2;&#x5173;&#x95ED;&#x6309;&#x94AE;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x540D;&#x79F0;</th>
          <th>&#x63CF;&#x8FF0;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>&#x81EA;&#x5B9A;&#x4E49;<code>title</code></td>
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
          <th>&#x56DE;&#x8C03;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>close</td>
          <td>&#x5173;&#x95ED; &#x5F39;&#x7A97;&#x540E;&#x89E6;&#x53D1;</td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
