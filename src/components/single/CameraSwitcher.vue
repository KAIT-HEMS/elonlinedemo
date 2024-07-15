<template>
  <!-- todo -->
  {{propertyList}}
  <div class="camera-switcher card shadow d-grid">
    <template v-if="cameraViewType === 'diagram'">
      <div class="bg-camera">
        <svg width="566" height="312" style="height: 80%; width: 100%; margin-top: 6.8%" viewBox="0 0 566 312" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path d="M82.179 196C82.179 196 82.1495 196 82.1385 196H70.821C65.9495 196 62 202.268 62 210C62 217.732 65.9495 224 70.821 224H82.1385C82.1385 224 82.168 224 82.179 224C87.0505 224 91 217.732 91 210C91 202.268 87.0505 196 82.179 196Z" fill="#B5C1D6"/>
            <path opacity="0.2" d="M82.179 196C82.179 196 82.1495 196 82.1385 196H70.821C65.9495 196 62 202.268 62 210C62 217.732 65.9495 224 70.821 224H82.1385C82.1385 224 82.168 224 82.179 224C87.0505 224 91 217.732 91 210C91 202.268 87.0505 196 82.179 196Z" fill="#4C5C75"/>
            <path d="M31.179 196C31.179 196 31.1495 196 31.1384 196H19.821C14.9495 196 11 202.268 11 210C11 217.732 14.9495 224 19.821 224H31.1384C31.1384 224 31.168 224 31.179 224C36.0505 224 40 217.732 40 210C40 202.268 36.0505 196 31.179 196Z" fill="#B5C1D6"/>
            <path opacity="0.2" d="M31.179 196C31.179 196 31.1495 196 31.1384 196H19.821C14.9495 196 11 202.268 11 210C11 217.732 14.9495 224 19.821 224H31.1384C31.1384 224 31.168 224 31.179 224C36.0505 224 40 217.732 40 210C40 202.268 36.0505 196 31.179 196Z" fill="#B5C1D6"/>
            <path opacity="0.2" d="M29 220C32.3137 220 35 215.97 35 211C35 206.029 32.3137 202 29 202C25.6864 202 23 206.029 23 211C23 215.97 25.6864 220 29 220Z" fill="#E3E7F0"/>
            <path d="M139 185L141.53 187.228C142.727 188.282 143.25 189.934 142.886 191.508L142.309 194L139.003 185H139Z" fill="#92BBF8"/>
            <path d="M142.945 199.941C142.499 195.082 141.237 190.338 139.207 185.909L138.333 184H117L128.058 216C131.946 215.025 135.552 213.138 138.574 210.493L138.83 210.269C141.775 207.691 143.307 203.851 142.949 199.941H142.945Z" fill="#EFF8FF"/>
            <path opacity="0.5" d="M142.945 199.941C142.498 195.082 141.237 190.337 139.206 185.909L138.332 184H117L128.058 216C131.945 215.025 135.552 213.139 138.574 210.494L138.83 210.27C141.774 207.691 143.307 203.851 142.949 199.941H142.945Z" fill="white"/>
            <path d="M114.761 224C109.923 224 106 217.732 106 210C106 202.268 109.923 196 114.761 196H126V224H114.761Z" fill="#B5C1D6"/>
            <path d="M126 224C130.971 224 135 217.732 135 210C135 202.268 130.971 196 126 196C121.029 196 117 202.268 117 210C117 217.732 121.029 224 126 224Z" fill="#9BA8BF"/>
            <path opacity="0.2" d="M126 219C129.314 219 132 214.971 132 210C132 205.029 129.314 201 126 201C122.687 201 120 205.029 120 210C120 214.971 122.687 219 126 219Z" fill="#E3E7F0"/>
            <path d="M51.1127 216L30 181.965C30 181.965 46.7036 165 83.1984 165C114.788 165 133.71 175.479 139 183.922L126.477 196.252C114.352 196.252 114.428 209.164 112.766 214.591C112.509 215.432 111.745 215.996 110.853 215.996H51.1127" fill="#EFF8FF"/>
            <path opacity="0.5" d="M49.1127 216L28 181.965C28 181.965 44.7037 165 81.1985 165C112.788 165 131.71 175.479 137 183.922L124.477 196.252C112.352 196.252 112.429 209.164 110.766 214.591C110.509 215.432 109.745 215.996 108.853 215.996H49.1127" fill="#EFF8FF"/>
            <path d="M63.7603 224C58.9223 224 55 217.732 55 210C55 202.268 58.9223 196 63.7603 196H75V224H63.7603Z" fill="#B5C1D6"/>
            <path d="M75.5 224C80.1944 224 84 217.732 84 210C84 202.268 80.1944 196 75.5 196C70.8056 196 67 202.268 67 210C67 217.732 70.8056 224 75.5 224Z" fill="#9BA8BF"/>
            <path opacity="0.2" d="M75 219C78.3137 219 81 214.971 81 210C81 205.029 78.3137 201 75 201C71.6863 201 69 205.029 69 210C69 214.971 71.6863 219 75 219Z" fill="#E3E7F0"/>
            <path d="M59.8676 213.089C60.9411 206.742 67.2573 196.225 75.2513 196.225L83 182H29.9098C26.5246 182 10.6976 187.731 4.93466 193.504C0.897302 197.546 0.479645 201.613 0.00336821 211.965C-0.091887 214.08 1.84619 215.897 4.17628 215.897C23.7623 215.904 47.4661 215.974 56.0941 216C57.9992 216.007 59.5782 214.789 59.8639 213.089H59.8676Z" fill="#EFF8FF"/>
            <path opacity="0.5" d="M59.8677 213.089C60.9411 206.742 67.2572 196.225 75.2513 196.225L83 182H29.9098C26.5246 182 10.6976 187.731 4.93466 193.504C0.897302 197.546 0.479645 201.613 0.0033682 211.965C-0.091887 214.08 1.84619 215.897 4.17628 215.897C23.7622 215.904 47.4661 215.974 56.0941 216C57.9992 216.007 59.5782 214.789 59.8639 213.089H59.8677Z" fill="#EFF8FF"/>
            <path opacity="0.3" d="M83.2571 165C46.95 165 30.3822 181.738 30.0036 181.996H30L66.7372 182C66.7372 182 82.5331 168.274 93 165.351C89.9018 165.122 86.6493 165 83.2571 165Z" fill="#407BFF"/>
            <path opacity="0.7" d="M37.8716 195.99C42.8602 194.119 57.9134 188.857 62.0185 190.224C66.1236 191.591 56.1826 196.474 53.6774 197.123C51.1758 197.772 49.5287 196.474 45.7799 198.27C42.0311 200.066 31.8321 198.259 37.8679 195.99H37.8716Z" fill="#92BBF8"/>
            <path opacity="0.2" d="M100.196 216C100.159 216 100.118 215.99 100.085 215.968C99.9961 215.909 99.9739 215.789 100.033 215.702C100.107 215.592 107.608 204.48 107.608 182.193C107.608 182.087 107.697 182 107.804 182C107.911 182 108 182.087 108 182.193C108 204.612 100.436 215.807 100.359 215.916C100.321 215.971 100.259 216 100.196 216Z" fill="#407BFF"/>
            <path opacity="0.2" d="M19.2339 199C19.2339 199 19.2048 199 19.1901 198.997L9.15009 196.423C9.04797 196.395 8.98233 196.281 9.00421 196.168C9.02609 196.053 9.13185 195.98 9.23396 196.005L19.2412 198.57L35.7874 196.468C35.8932 196.456 35.988 196.537 35.9989 196.656C36.0099 196.773 35.937 196.878 35.8312 196.891L19.2521 198.997C19.2521 198.997 19.2376 198.997 19.2303 198.997L19.2339 199Z" fill="#407BFF"/>
            <path opacity="0.2" d="M126.199 196C126.147 196 126.098 195.982 126.057 195.943C125.981 195.869 125.981 195.751 126.057 195.678C129.675 192.337 131.602 184.537 131.602 180.188C131.602 180.085 131.692 180 131.801 180C131.91 180 132 180.085 132 180.188C132 184.601 130.032 192.532 126.338 195.943C126.301 195.979 126.248 195.996 126.199 195.996V196Z" fill="#407BFF"/>
            <path d="M97.7691 186H103.231C103.653 186 104 185.55 104 185.001C104 184.45 103.653 184 103.231 184H97.7691C97.3461 184 97 184.45 97 185.001C97 185.55 97.3461 186 97.7691 186Z" fill="#92BBF8"/>
            <path d="M119.77 186H125.23C125.654 186 126 185.55 126 185.001C126 184.45 125.654 184 125.23 184H119.77C119.346 184 119 184.45 119 185.001C119 185.55 119.346 186 119.77 186Z" fill="#92BBF8"/>
            <path opacity="0.7" d="M8.82389 196.814C7.83203 196.144 6.21279 195.085 4.37627 194C3.32482 195.264 2.56078 196.561 2 198.051C2.55376 198.176 3.18813 198.463 3.97672 199.137C6.31794 201.138 12.588 199.367 8.82389 196.814Z" fill="#92BBF8"/>
            <path opacity="0.3" d="M73 182H124.488C127.12 182 129.707 181.3 132 179.968C132 179.968 123.67 172.166 106.895 168.805C100.003 167.422 93.4677 166.887 91.4588 167.02C86.6672 169.621 79.325 175.095 73 182Z" fill="#407BFF"/>
            <path d="M41.9893 213H6.00705C5.1411 213 4.68095 211.998 5.25342 211.362L6.18458 210.331C6.37662 210.121 6.64836 210 6.93822 210H41.0617C41.348 210 41.6234 210.121 41.8154 210.331L42.7466 211.362C43.3191 211.998 42.8589 213 41.993 213H41.9893Z" fill="#B5C1D6"/>
          </g>
          <path d="M225 226.994H143.286C134.549 227.125 117.999 225.029 121.7 215.597C125.401 206.166 123.241 199.616 121.7 197.52C120.159 195.555 120.159 191.704 132.492 192.018" :stroke="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : 'grey'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M474 198.5H472V202.5H474V198.5ZM565.186 157.076C565.78 156.144 565.507 154.908 564.576 154.314C563.644 153.72 562.408 153.993 561.814 154.924L565.186 157.076ZM474 202.5C485.207 202.5 492.293 202.268 516.054 195.422L514.946 191.578C491.507 198.332 484.793 198.5 474 198.5V202.5ZM516.054 195.422C528.232 191.913 538.947 184.76 547.362 177.324C555.779 169.885 562.001 162.068 565.186 157.076L561.814 154.924C558.832 159.598 552.855 167.131 544.713 174.326C536.57 181.523 526.368 188.287 514.946 191.578L516.054 195.422Z" fill="#FACC91"/>
          <path d="M213.541 127.043H256.545V230.105H213.541V127.043Z" fill="#EFF8FF"/>
          <path d="M240.189 142.38H234.628L239.49 134.614H233.378L229.295 145.585H234.377L231.277 155.494L240.189 142.38Z" fill="#407BFF" fill-opacity="0.5"/>
          <path d="M240.189 142.38H234.628L230.657 141.877L229.295 145.586H234.377L231.277 155.494L240.189 142.38Z" fill="#407BFF"/>
          <path d="M190.806 152.577L190.807 143.261V133.945M190.807 133.945L185.546 139.031M190.807 133.945L195.893 139.205" stroke="#407BFF" stroke-width="2.24515" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M204.131 133.057V142.374V151.69M204.131 151.69L209.39 146.604M204.131 151.69L199.044 146.43" stroke="#407BFF" stroke-width="2.24515" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M221.536 125.276H261.574V126.832H221.536V125.276Z" fill="#6C9AFF"/>
          <path opacity="0.4" d="M221.697 125.276H226.447V126.557H221.697V125.276Z" fill="#2550FA"/>
          <path d="M261.053 230.622H254.823V126.557H261.053V230.622Z" fill="#C9CEE2"/>
          <path opacity="0.5" d="M231.684 198.525C230.264 197.104 230.264 194.8 231.684 193.38C233.104 191.959 235.408 191.959 236.828 193.38C238.249 194.8 238.249 197.104 236.828 198.525C235.408 199.945 233.104 199.945 231.684 198.525Z" fill="#407BFF"/>
          <path opacity="0.4" d="M261.053 230.622H254.823V126.557H261.053V230.622Z" fill="#6C9AFF"/>
          <path opacity="0.5" d="M242.458 161.15H225.405V187.842H242.458V161.15Z" fill="#407BFF"/>
          <path opacity="0.5" d="M225.405 161.071V187.329L230.055 164.725L225.405 161.071Z" fill="#407BFF"/>
          <path d="M237.505 170.138L237.769 168.853H234.222L233.958 170.138H232.586L230.073 182.336H236.397L238.91 170.138H237.505Z" fill="#407BFF"/>
          <path opacity="0.4" d="M237.175 174.468L235.882 180.754C235.791 181.199 235.4 181.516 234.947 181.516H231.791C231.424 181.516 231.153 181.183 231.227 180.824L232.521 174.538C232.611 174.093 233.003 173.776 233.456 173.776H236.611C236.978 173.776 237.25 174.109 237.175 174.468Z" fill="white"/>
          <path opacity="0.4" d="M225.405 161.071H242.524V164.725H230.055L225.405 161.071Z" fill="#C9CEE2"/>
          <path d="M135.235 196.287L132 197V187L135.235 187.713C135.674 187.808 136 188.486 136 189.281V194.712C136 195.514 135.669 196.186 135.235 196.281V196.287Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : 'grey'"/>
          <path d="M134 188V196C131.792 196 130 194.207 130 192C130 189.793 131.792 188 134 188Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : 'grey'"/>
          <path d="M233.553 194.69C232.925 195.145 232.786 196.022 233.241 196.649C233.697 197.277 234.574 197.416 235.201 196.961L233.553 194.69ZM262.161 220.673H260.757V223.479H262.161V220.673ZM235.201 196.961C235.646 196.638 236.818 196.052 238.497 195.493C240.139 194.945 242.149 194.463 244.211 194.286C248.409 193.925 252.351 194.84 254.357 198.367L256.797 196.981C253.967 192.005 248.547 191.097 243.971 191.489C241.647 191.689 239.418 192.227 237.609 192.83C235.837 193.421 234.344 194.115 233.553 194.69L235.201 196.961ZM254.357 198.367C254.648 198.878 254.869 199.791 254.974 201.192C255.076 202.554 255.059 204.196 254.997 206.048C254.877 209.692 254.584 214.117 254.837 218.185C255.087 222.219 255.884 226.266 258.205 229.022C260.651 231.926 264.489 233.08 269.992 231.955L269.43 229.206C264.582 230.196 261.932 229.09 260.352 227.214C258.647 225.191 257.882 221.939 257.638 218.012C257.396 214.12 257.678 209.923 257.803 206.14C257.864 204.277 257.887 202.505 257.773 200.982C257.662 199.5 257.41 198.059 256.797 196.981L254.357 198.367ZM269.992 231.955C273.578 231.222 276.248 230.286 277.884 229.202C278.693 228.666 279.41 227.989 279.745 227.128C280.122 226.155 279.921 225.185 279.33 224.401C278.794 223.69 277.963 223.15 277.026 222.727C276.066 222.293 274.87 221.926 273.465 221.627C270.655 221.028 266.87 220.673 262.161 220.673V223.479C266.749 223.479 270.325 223.827 272.881 224.371C274.16 224.644 275.15 224.958 275.871 225.284C276.615 225.62 276.96 225.918 277.089 226.089C277.143 226.162 277.136 226.181 277.131 226.15C277.125 226.114 277.136 226.093 277.128 226.112C277.098 226.192 276.932 226.467 276.334 226.863C275.154 227.645 272.91 228.494 269.43 229.206L269.992 231.955Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : 'grey'"/>
          <path d="M233.553 194.69C232.925 195.145 232.786 196.022 233.241 196.649C233.697 197.277 234.574 197.416 235.201 196.961M233.553 194.69L235.201 196.961M233.553 194.69C234.344 194.115 235.837 193.421 237.609 192.83C239.418 192.227 241.647 191.689 243.971 191.489C248.547 191.097 253.967 192.005 256.797 196.981M235.201 196.961C235.646 196.638 236.818 196.052 238.497 195.493C240.139 194.945 242.149 194.463 244.211 194.286C248.409 193.925 252.351 194.84 254.357 198.367M255.577 197.674L254.357 198.367M254.357 198.367L256.797 196.981M254.357 198.367C254.648 198.878 254.869 199.791 254.974 201.192C255.076 202.554 255.059 204.196 254.997 206.048C254.877 209.692 254.584 214.117 254.837 218.185C255.087 222.219 255.884 226.266 258.205 229.022C260.651 231.926 264.489 233.08 269.992 231.955M269.71 230.58L269.992 231.955M269.992 231.955L269.43 229.206M269.992 231.955C273.578 231.222 276.248 230.286 277.884 229.202C278.693 228.666 279.41 227.989 279.745 227.128C280.122 226.155 279.921 225.185 279.33 224.401C278.794 223.69 277.963 223.15 277.026 222.727C276.066 222.293 274.87 221.926 273.465 221.627C270.655 221.028 266.87 220.673 262.161 220.673M262.161 220.673H260.757V223.479H262.161M262.161 220.673V223.479M262.161 223.479C266.749 223.479 270.325 223.827 272.881 224.371C274.16 224.644 275.15 224.958 275.871 225.284C276.615 225.62 276.96 225.918 277.089 226.089C277.143 226.162 277.136 226.181 277.131 226.15C277.125 226.114 277.136 226.093 277.128 226.112C277.098 226.192 276.932 226.467 276.334 226.863C275.154 227.645 272.91 228.494 269.43 229.206M256.797 196.981C257.41 198.059 257.662 199.5 257.773 200.982C257.887 202.505 257.864 204.277 257.803 206.14C257.678 209.923 257.396 214.12 257.638 218.012C257.882 221.939 258.647 225.191 260.352 227.214C261.932 229.09 264.582 230.196 269.43 229.206" :stroke="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : 'grey'"/>
          <text fill="#2D9E68" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="400" y="248.59">0% </tspan></text>
          <text fill="#2D9E68" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="379" y="265.723">Remaining</tspan></text>
          <text fill="#787676" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="430.642" y="217.59">0%</tspan></text>
          <text fill="#787676" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="430.642" y="140.392">100%</tspan></text>
          <text fill="#505050" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="310" y="104.98">Mode</tspan></text>
          <path d="M368.66 120.86H292.66C288.518 120.86 285.16 124.218 285.16 128.36V144.36C285.16 148.502 288.518 151.86 292.66 151.86H368.66C372.802 151.86 376.16 148.502 376.16 144.36V128.36C376.16 124.218 372.802 120.86 368.66 120.86Z" :stroke="propertyList['0xDA'] === '0x42' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x42' ? '#3779F5' : 'white'"/>
          <text fill="#7E7E7E" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="301.96" y="139.766">Charge</tspan></text>
          <path d="M369 161.5H292C287.858 161.5 284.5 164.858 284.5 169V185C284.5 189.142 287.858 192.5 292 192.5H369C373.142 192.5 376.5 189.142 376.5 185V169C376.5 164.858 373.142 161.5 369 161.5Z" :stroke="propertyList['0xDA'] === '0x43' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x43' ? '#3779F5' : 'white'"/>
          <text fill="#7E7E7E" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="289.844" y="180.406">Discharge</tspan></text>
          <path d="M368 200H292C287.582 200 284 203.582 284 208V224C284 228.418 287.582 232 292 232H368C372.418 232 376 228.418 376 224V208C376 203.582 372.418 200 368 200Z"  :stroke="propertyList['0xDA'] === '0x44' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x44' ? '#3779F5' : 'white'"/>
          <text fill="#7E7E7E" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="296.527" y="221">Standby</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="18" letter-spacing="0em"><tspan x="229" y="307.665">EV Charger/Discharger</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="12" letter-spacing="0em"><tspan x="37" y="130.11">Chargeable&#10;</tspan><tspan x="37" y="149.11">Dischargeable</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="12" letter-spacing="0em"><tspan x="38" y="85.11">Vehicle Status&#10;</tspan><tspan x="38" y="104.11">EPC: 0xC7</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="12" letter-spacing="0em"><tspan x="274" y="11.11">Charger/Discharger Type&#10;</tspan><tspan x="274" y="30.11">EPC: 0xCC DC_Type AA</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="10" letter-spacing="0em"><tspan x="278" y="64.425">Operation Mode&#10;</tspan><tspan x="278" y="81.425">EPC: 0xDA</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="10" letter-spacing="0em"><tspan x="387" y="64.425">Remaining Energy&#10;</tspan><tspan x="387" y="81.425">EPC: 0xE4</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="10" letter-spacing="0em"><tspan x="141.453" y="241.425">{{(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'Connected' : 'Not Connected'}}</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="10" letter-spacing="0em"><tspan x="506.336" y="219.425">1000W</tspan></text>
          <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="10" letter-spacing="0em"><tspan x="473" y="163.425">Electric Power&#10;</tspan><tspan x="473" y="180.425">EPC: 0xD3</tspan></text>
          <circle cx="126.5" cy="126.5" r="5.5" :fill="(propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x43') ? 'green' : (propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x42') ? 'red' : 'grey'"/>
          <circle cx="126.5" cy="145.5" r="5.5" :fill="(propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43') ? 'green' : (propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41') ? 'red' : 'grey'"/>
          <path d="M401.715 128.878V217.339C401.715 218.72 402.834 219.839 404.215 219.839H420.919C422.3 219.839 423.419 218.72 423.419 217.339V128.878C423.419 127.498 422.3 126.378 420.919 126.378H404.215C402.834 126.378 401.715 127.498 401.715 128.878Z" fill="#47E298" stroke="#5AC491"/>
          <path d="M407.777 123.176C407.777 122.071 408.672 121.176 409.777 121.176H415.357C416.462 121.176 417.357 122.071 417.357 123.176V124.417H407.777V123.176Z" fill="#5AC391"/>
          <path d="M418.093 130.167H407.041C406.213 130.167 405.541 130.839 405.541 131.667V214.694C405.541 215.522 406.213 216.194 407.041 216.194H418.093C418.922 216.194 419.593 215.522 419.593 214.694V131.667C419.593 130.839 418.922 130.167 418.093 130.167Z" fill="white"/>
          <path d="M406.628 218.321H418.31C419.185 218.321 419.895 217.611 419.895 216.736V129.667C419.895 128.791 419.185 128.081 418.31 128.081H406.628C405.753 128.081 405.043 128.791 405.043 129.667V216.736C405.043 217.611 405.753 218.321 406.628 218.321Z" fill="#47E298"/>
        </svg>
      </div>
        <div class="card-body d-grid justify-items-center align-content-center gap-4 form-check">
          Left side
        </div>
    </template>
    <template v-else>
      <div class="bg-secondary bg-camera d-grid justify-content-center align-content-center" ref="cameraView">
        <router-link class="link-dark" :to="{ name: 'settings.cameras' }" v-show="cameraError">
          <i class="bi-camera-video-off-fill display-3 p-5"></i>
        </router-link>
        <i class="bi-arrow-repeat position-absolute bottom-0 start-0 display-6 p-3 text-white" role="button" @click="reloadCamera"></i>
      </div>
      <div class="card-body d-grid justify-items-center align-content-center gap-4 form-check">
        <div :title="text?.cameraSwitcher?.cam1?.title"><input class="form-check-input" type="radio" name="cameraOption" id="cameraOption0" v-model.number="cameraOption" value="0"><label class="form-check-label" for="cameraOption0">{{ text?.cameraSwitcher?.cam1?.label }}</label></div>
        <div :title="text?.cameraSwitcher?.cam2?.title"><input class="form-check-input" type="radio" name="cameraOption" id="cameraOption1" v-model.number="cameraOption" value="1"><label class="form-check-label" for="cameraOption1">{{ text?.cameraSwitcher?.cam2?.label }}</label></div>
        <div :title="text?.cameraSwitcher?.cam3?.title"><input class="form-check-input" type="radio" name="cameraOption" id="cameraOption2" v-model.number="cameraOption" value="2"><label class="form-check-label" for="cameraOption2">{{ text?.cameraSwitcher?.cam3?.label }}</label></div>
        <div :title="text?.cameraSwitcher?.pan?.title"><button class="btn border-0 p-0 me-1 fs-4 text-primary" type="button" @click="panDown"><i class="bi-caret-left-fill align-text-bottom"></i></button><span>{{ text?.cameraSwitcher?.pan?.label }}</span><button class="btn border-0 p-0 ms-1 fs-4 text-primary" type="button" @click="panUp"><i class="bi-caret-right-fill align-text-bottom"></i></button></div>
        <div :title="text?.cameraSwitcher?.tilt?.title"><button class="btn border-0 p-0 me-1 fs-4 text-primary" type="button" @click="tiltUp"><i class="bi-caret-up-fill align-text-bottom"></i></button><span>{{ text?.cameraSwitcher?.tilt?.label }}</span><button class="btn border-0 p-0 ms-1 fs-4 text-primary" type="button" @click="tiltDown"><i class="bi-caret-down-fill align-text-bottom"></i></button></div>
        <div :title="text?.cameraSwitcher?.zoom?.title"><button class="btn border-0 p-0 me-1 fs-4 text-primary" type="button" @click="zoomUp"><i class="bi-zoom-in align-text-bottom"></i></button><span>{{ text?.cameraSwitcher?.zoom?.label }}</span><button class="btn border-0 p-0 ms-1 fs-4 text-primary" type="button" @click="zoomDown"><i class="bi-zoom-out align-text-bottom"></i></button></div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const store        = useStore(),
          route        = useRoute(),
          routeName    = computed(() => route.name),
          cameraError  = ref<boolean>(true),
          cameraView   = ref<HTMLElement|null>(null),
          cameraOption = ref<number>(0),
          cameras      = [
            { pan: 0, tilt: 0, zoom: 100 },
            { pan: 0, tilt: 0, zoom: 100 },
            { pan: 0, tilt: 0, zoom: 100 }
          ],
          pan          = {
            command: '10094856',
            MIN:     -36e3,
            MAX:     36e3,
            reset:   function () { cameras[cameraOption.value].pan = 0; },
            up:      function () {
              cameras[cameraOption.value].pan += 3600;
              if (this.MAX < cameras[cameraOption.value].pan) { cameras[cameraOption.value].pan = this.MAX; }
            },
            down:    function () {
              cameras[cameraOption.value].pan -= 3600;
              if (cameras[cameraOption.value].pan < this.MIN) { cameras[cameraOption.value].pan = this.MIN; }
            }
          },
          tilt         = {
            command: '10094857',
            MIN:     -36e3,
            MAX:     36e3,
            reset:   function () { cameras[cameraOption.value].tilt = 0; },
            up:      function () {
              cameras[cameraOption.value].tilt += 3600;
              if (this.MAX < cameras[cameraOption.value].tilt) { cameras[cameraOption.value].tilt = this.MAX; }
            },
            down:    function () {
              cameras[cameraOption.value].tilt -= 3600;
              if (cameras[cameraOption.value].tilt < this.MIN) { cameras[cameraOption.value].tilt = this.MIN; }
            }
          },
          zoom         = {
            command: '10094861',
            MIN:     100,
            MAX:     500,
            reset:   function () { cameras[cameraOption.value].zoom = 100; },
            up:      function () {
              cameras[cameraOption.value].zoom += 10;
              if (this.MAX < cameras[cameraOption.value].zoom) { cameras[cameraOption.value].zoom = this.MAX; }
            },
            down:    function () {
              cameras[cameraOption.value].zoom -= 10;
              if (cameras[cameraOption.value].zoom < this.MIN) { cameras[cameraOption.value].zoom = this.MIN; }
            }
          },
          nodes        = computed(() => store.state.nodes),
          device       = computed(() => store.state.device),
          locale       = computed(() => store.state.locale),
          propertyList = ref<EpcEdtList>({});

    const cameraViewType = computed(() => store.getters.cameraViewType);

    function switchCamera(id: number, isReload?: boolean) {
      const source = store.state.cameras[store.state.cameraHolders['single' + id]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=snapshot&t=${Date.now()}`)
        .then(() => {
          if (isReload) {
            window.stop();
          }
          cameraError.value = false;
          cameraView.value!.classList.add('bg-dark');
          cameraView.value!.classList.remove('bg-secondary');
          cameraView.value!.style.backgroundImage = `url(${origin}/?action=stream&t=${Date.now()})`;
        });
    }

    function reloadCamera() {
      if (store.state.cameras.length === 0) { return; }
      cameraView.value!.style.backgroundImage = '';
      cameraView.value!.classList.add('bg-secondary');
      cameraView.value!.classList.remove('bg-dark');
      cameraError.value = true;
      switchCamera(cameraOption.value, true);
    }

    function panCamera() {
      if (cameraError.value) { return; }

      const source = store.state.cameras[store.state.cameraHolders['single' + cameraOption.value]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=command&group=1&id=10094856&value=${cameras[cameraOption.value].pan}`).catch(err => !err);
    }

    function tiltCamera() {
      if (cameraError.value) { return; }

      const source = store.state.cameras[store.state.cameraHolders['single' + cameraOption.value]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=command&group=1&id=10094857&value=${cameras[cameraOption.value].tilt}`).catch(err => !err);
    }

    function zoomCamera() {
      if (cameraError.value) { return; }

      const source = store.state.cameras[store.state.cameraHolders['single' + cameraOption.value]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=command&group=1&id=10094861&value=${cameras[cameraOption.value].zoom}`).catch(err => !err);
    }

    interface EpcEdtList {
      [key: string]: any;
    }

    async function updateProperties() {

      const epcList = [0xC7, 0xCC, 0xD3, 0xDA, 0xE4];
      const epc_edt_List: EpcEdtList = {};

      epcList.forEach(epc => {
        let edt = store.getters.data(device.value.ip, device.value.eoj, epc);
        epc_edt_List[epc.toHex(2).toUpperCase().prefix('0x')] = (() => { let hex = ''; edt.forEach((v: number) => { hex += v.toHex(2).toUpperCase(); }); return hex.prefix('0x'); })()
      });

      console.log("🚀 ~ propertyList>>>>", epc_edt_List)
      propertyList.value = epc_edt_List;
    }

    watch(cameraOption, value => {
      if (store.state.cameras.length === 0) { return; }
      cameraView.value!.style.backgroundImage = '';
      cameraView.value!.classList.add('bg-secondary');
      cameraView.value!.classList.remove('bg-dark');
      cameraError.value = true;
      switchCamera(value, true);
    });

    watch(routeName, value => {
      if (value !== 'single' || store.state.cameras.length === 0) { return; }
      reloadCamera();
    });

    onMounted(() => {
      if (store.state.cameras.length === 0) { return; }
      switchCamera(cameraOption.value);
      updateProperties();
    });

    watch([nodes, device, locale], () => {
      updateProperties();
    });

    return {
      text: computed(() => store.getters.text?.single?.controller),
      cameraView,
      cameraViewType,
      cameraError,
      cameraOption,
      reloadCamera,
      panUp: () => { pan.up(); panCamera(); },
      panDown: () => { pan.down(); panCamera(); },
      tiltUp: () => { tilt.up(); tiltCamera(); },
      tiltDown: () => { tilt.down(); tiltCamera(); },
      zoomUp: () => { zoom.up(); zoomCamera(); },
      zoomDown: () => { zoom.down(); zoomCamera(); },
      propertyList
    };
  }
});
</script>

<style lang="scss" scoped>
.camera-switcher {
  grid-template-columns: minmax(0, 1fr) 180px;
}
</style>
