<template>
  <div class="camera-switcher card shadow d-grid">
    <template v-if="cameraViewType === 'diagram_evchargerdischarger'">
      <div class="card flex-grow-1 d-grid grid-template-100" style="padding: 50px; border: none;">
        <svg width="798" height="325" viewBox="0 0 798 325" style="height: 100%; width: 100%;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="ELline5" d="M794 154.5C772.5 179 749.4 227 627 227" :stroke="propertyList['0xD3'] && propertyList['0xD3']?.replace(/\s|W/g, '') != 0 ? 'orange' : '#bbbbbb'" stroke-width="6" stroke-linecap="round"/>
          <path id="ELline5" class="animate" :class="propertyList['0xD3']?.replace(/\s|W/g, '') > 0 ? 'normal' : 'reverse'" v-show="propertyList['0xD3'] && propertyList['0xD3']?.replace(/\s|W/g, '') != 0" d="M794 154.5C772.5 179 749.4 227 627 227" stroke-linejoin="round"/>
          <rect id="Rectangle 1" x="294.5" y="0.5" width="332" height="293" rx="6.5" stroke="#A3A3A3" fill="white"/>
          <g id="ev-charger-discharger-diagram-battery">
            <g id="ev-charger-discharger-diagram-icon-battery">
              <g id="g3468">
                <g id="g3364">
                  <path id="path3308" d="M111.429 211.034C111.429 211.034 111.389 211.034 111.374 211.034H96.0284C89.423 211.034 84.0678 219.532 84.0678 230.016C84.0678 240.502 89.423 249 96.0284 249H111.374C111.374 249 111.414 249 111.429 249C118.035 249 123.39 240.502 123.39 230.016C123.39 219.532 118.035 211.034 111.429 211.034Z" fill="#B5C1D6"/>
                  <path id="path3310" opacity="0.2" d="M111.429 211.034C111.429 211.034 111.389 211.034 111.374 211.034H96.0284C89.423 211.034 84.0678 219.532 84.0678 230.016C84.0678 240.502 89.423 249 96.0284 249H111.374C111.374 249 111.414 249 111.429 249C118.035 249 123.39 240.502 123.39 230.016C123.39 219.532 118.035 211.034 111.429 211.034Z" fill="#B6C0D4"/>
                  <path id="path3312" d="M42.2767 211.034C42.2767 211.034 42.2367 211.034 42.2217 211.034H26.8759C20.2705 211.034 14.9153 219.532 14.9153 230.016C14.9153 240.502 20.2705 249 26.8759 249H42.2217C42.2217 249 42.2617 249 42.2767 249C48.8821 249 54.2373 240.502 54.2373 230.016C54.2373 219.532 48.8821 211.034 42.2767 211.034Z" fill="#B5C1D6"/>
                  <path id="path3314" opacity="0.2" d="M42.2767 211.034C42.2767 211.034 42.2367 211.034 42.2217 211.034H26.8759C20.2705 211.034 14.9153 219.532 14.9153 230.016C14.9153 240.502 20.2705 249 26.8759 249H42.2217C42.2217 249 42.2617 249 42.2767 249C48.8821 249 54.2373 240.502 54.2373 230.016C54.2373 219.532 48.8821 211.034 42.2767 211.034Z" fill="#B7BFCD"/>
                  <path id="path3316" opacity="0.2" d="M39.3221 243.576C43.8152 243.576 47.4576 238.112 47.4576 231.373C47.4576 224.633 43.8152 219.169 39.3221 219.169C34.829 219.169 31.1865 224.633 31.1865 231.373C31.1865 238.112 34.829 243.576 39.3221 243.576Z" fill="#E3E7F0"/>
                  <path id="path3320" d="M193.823 216.378C193.219 209.79 191.507 203.356 188.755 197.352L187.57 194.763H158.644L173.638 238.153C178.91 236.831 183.8 234.272 187.897 230.686L188.244 230.381C192.237 226.886 194.315 221.679 193.828 216.378H193.823Z" fill="#EFF8FF"/>
                  <path id="path3322" opacity="0.5" d="M193.824 216.378C193.218 209.789 191.508 203.355 188.754 197.351L187.569 194.763H158.644L173.638 238.153C178.909 236.831 183.8 234.273 187.896 230.687L188.244 230.382C192.236 226.886 194.314 221.68 193.829 216.378H193.824Z" fill="#E1EDFF"/>
                  <path id="path3324" d="M155.608 249C149.048 249 143.729 240.502 143.729 230.016C143.729 219.532 149.048 211.034 155.608 211.034H170.847V249H155.608Z" fill="#B7BFCD"/>
                  <path id="path3326" d="M170.847 249C177.587 249 183.051 240.502 183.051 230.016C183.051 219.532 177.587 211.034 170.847 211.034C164.108 211.034 158.644 219.532 158.644 230.016C158.644 240.502 164.108 249 170.847 249Z" fill="#818894"/>
                  <path id="path3328" opacity="0.2" d="M170.847 242.22C175.341 242.22 178.983 236.757 178.983 230.016C178.983 223.277 175.341 217.814 170.847 217.814C166.355 217.814 162.712 223.277 162.712 230.016C162.712 236.757 166.355 242.22 170.847 242.22Z" fill="#E3E7F0"/>
                  <path id="path3330" d="M69.3053 238.153L40.678 192.003C40.678 192.003 63.327 169 112.811 169C155.645 169 181.301 183.208 188.475 194.657L171.494 211.376C155.053 211.376 155.157 228.883 152.903 236.242C152.555 237.382 151.518 238.147 150.309 238.147H69.3053" fill="#E1EDFF"/>
                  <path id="path3332" opacity="0.5" d="M66.5935 238.153L37.9661 192.003C37.9661 192.003 60.6151 169 110.1 169C152.933 169 178.589 183.208 185.763 194.657L168.783 211.376C152.341 211.376 152.446 228.883 150.191 236.242C149.843 237.382 148.807 238.147 147.598 238.147H66.5935" fill="#E1EDFF"/>
                  <path id="path3334" d="M86.4547 249C79.8947 249 74.5763 240.502 74.5763 230.016C74.5763 219.532 79.8947 211.034 86.4547 211.034H101.695V249H86.4547Z" fill="#B7BFCD"/>
                  <path id="path3336" d="M102.373 249C108.738 249 113.898 240.502 113.898 230.016C113.898 219.532 108.738 211.034 102.373 211.034C96.0076 211.034 90.8475 219.532 90.8475 230.016C90.8475 240.502 96.0076 249 102.373 249Z" fill="#818894"/>
                  <path id="path3338" opacity="0.2" d="M101.695 242.22C106.188 242.22 109.831 236.757 109.831 230.016C109.831 223.277 106.188 217.814 101.695 217.814C97.2018 217.814 93.5593 223.277 93.5593 230.016C93.5593 236.757 97.2018 242.22 101.695 242.22Z" fill="#E3E7F0"/>
                  <path id="path3340" d="M81.1764 234.205C82.632 225.599 91.1963 211.339 102.036 211.339L112.542 192.051H40.5557C35.9655 192.051 14.5053 199.821 6.69106 207.65C1.21668 213.131 0.650366 218.645 0.00456707 232.682C-0.124593 235.549 2.5033 238.012 5.66275 238.012C32.22 238.023 64.3609 238.117 76.0598 238.152C78.643 238.162 80.784 236.51 81.1715 234.205H81.1764Z" fill="#EFF8FF"/>
                  <path id="path3342" opacity="0.5" d="M81.1765 234.205C82.632 225.599 91.1605 211.5 102 211.5L112.542 192.051H40.5557C35.9656 192.051 14.5052 199.821 6.69107 207.65C1.21668 213.131 0.650366 218.645 0.00456706 232.682C-0.124593 235.549 2.50331 238.012 5.66276 238.012C32.22 238.023 64.3608 238.117 76.0598 238.153C78.6429 238.162 80.784 236.51 81.1714 234.205H81.1765Z" fill="#D2E2FF"/>
                  <path id="path3348" opacity="0.3" d="M135.859 238.153C135.809 238.153 135.753 238.138 135.708 238.109C135.588 238.029 135.558 237.867 135.638 237.748C135.738 237.6 145.909 222.533 145.909 192.312C145.909 192.169 146.03 192.051 146.175 192.051C146.32 192.051 146.441 192.169 146.441 192.312C146.441 222.711 136.185 237.891 136.08 238.039C136.029 238.113 135.944 238.153 135.859 238.153Z" fill="#407BFF"/>
                  <path id="path3350" opacity="0.3" d="M26.0798 215.102C26.0798 215.102 26.0403 215.102 26.0205 215.097L12.4069 211.608C12.2684 211.569 12.1794 211.415 12.2091 211.262C12.2387 211.106 12.3821 211.007 12.5206 211.04L26.0897 214.518L48.5253 211.669C48.6687 211.653 48.7972 211.762 48.8121 211.923C48.8269 212.083 48.7281 212.225 48.5846 212.242L26.1046 215.097C26.1046 215.097 26.0848 215.097 26.0749 215.097L26.0798 215.102Z" fill="#407BFF"/>
                  <path id="path3352" opacity="0.3" d="M171.117 211.034C171.047 211.034 170.98 211.009 170.924 210.956C170.822 210.856 170.822 210.697 170.924 210.597C175.831 206.067 178.443 195.491 178.443 189.593C178.443 189.454 178.565 189.339 178.713 189.339C178.861 189.339 178.983 189.454 178.983 189.593C178.983 195.577 176.315 206.332 171.306 210.956C171.256 211.005 171.184 211.029 171.117 211.029V211.034Z" fill="#407BFF"/>
                <g id="Group 2">
                  <path id="path3318" d="M188.475 196.119L191.905 199.14C193.528 200.569 194.237 202.809 193.744 204.944L192.961 208.322L188.478 196.119H188.475Z" fill="#407BFF"/>
                  <path id="path3344" d="M112.891 169C63.661 169 41.1962 191.695 40.6829 192.046H40.678L90.4911 192.051C90.4911 192.051 111.909 173.439 126.102 169.476C121.901 169.165 117.491 169 112.891 169Z" fill="#407BFF"/>
                  <path id="path3346" d="M51.3513 211.02C58.1154 208.483 78.5266 201.348 84.0928 203.202C89.6591 205.055 76.1798 211.676 72.7828 212.556C69.3908 213.436 67.1575 211.676 62.0744 214.111C56.9913 216.546 43.1621 214.097 51.3462 211.02H51.3513Z" fill="#407BFF"/>
                  <path id="path3354" d="M132.568 197.475H139.974C140.546 197.475 141.017 196.864 141.017 196.12C141.017 195.373 140.546 194.763 139.974 194.763H132.568C131.995 194.763 131.525 195.373 131.525 196.12C131.525 196.864 131.995 197.475 132.568 197.475Z" fill="#407BFF"/>
                  <path id="path3356" d="M162.399 197.475H169.804C170.378 197.475 170.847 196.864 170.847 196.12C170.847 195.373 170.378 194.763 169.804 194.763H162.399C161.826 194.763 161.356 195.373 161.356 196.12C161.356 196.864 161.826 197.475 162.399 197.475Z" fill="#407BFF"/>
                  <path id="path3358" d="M11.9646 212.137C10.6197 211.23 8.42412 209.794 5.93391 208.322C4.50822 210.036 3.47223 211.794 2.71185 213.815C3.46272 213.985 4.32288 214.374 5.39215 215.287C8.56669 218 17.0685 215.599 11.9646 212.137Z" fill="#407BFF"/>
                  <path id="path3360" d="M98.983 192.051H168.798C172.366 192.051 175.873 191.102 178.983 189.295C178.983 189.295 167.688 178.717 144.942 174.159C135.597 172.284 126.736 171.558 124.012 171.739C117.515 175.266 107.559 182.688 98.983 192.051Z" fill="#407BFF"/>
                </g>
                  <path id="path3362" d="M56.9346 234.085H8.14515C6.97098 234.085 6.34705 232.726 7.12328 231.864L8.38588 230.466C8.64627 230.182 9.01472 230.017 9.40776 230.017H55.6769C56.0652 230.017 56.4385 230.182 56.6988 230.466L57.9615 231.864C58.7377 232.726 58.1137 234.085 56.9396 234.085H56.9346Z" fill="#B7BFCD"/>
                </g>
                <path id="ELline1" d="M342.5 251.994H241.286C232.55 252.125 132 254.5 140.5 243.5C144 230 143 228.5 140.5 214.5C138.959 212.535 143.167 205.185 155.5 205.5" :stroke="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="ELline1" class="animate" :class="propertyList['0xDA'] === '0x43' ? 'reverse' : 'normal'" v-show="propertyList['0xDA'] === '0x42' || propertyList['0xDA'] === '0x43'" d="M342.5 251.994H241.286C232.55 252.125 132 254.5 140.5 243.5C144 230 143 228.5 140.5 214.5C138.959 212.535 143.167 205.185 155.5 205.5" stroke-linejoin="round"/>
                <path id="ELline2" d="M160.235 209.287L157 210V200L160.235 200.713C160.674 200.808 161 201.486 161 202.281V207.712C161 208.514 160.669 209.186 160.235 209.281V209.287Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'"/>
                <path id="ELline3" d="M159 201V209C156.792 209 155 207.207 155 205C155 202.793 156.792 201 159 201Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'"/>
                <path id="path3372" d="M341.541 152.043H384.545V255.105H341.541V152.043Z" fill="#EFF8FF"/>
                <path id="path3374" d="M368.19 167.38H362.628L367.49 159.614H361.378L357.295 170.585H362.377L359.277 180.494L368.19 167.38Z" fill="#407BFF" fill-opacity="0.5"/>
                <path id="path3376" d="M368.19 167.38H362.628L358.657 166.877L357.295 170.586H362.377L359.277 180.494L368.19 167.38Z" fill="#407BFF"/>
                <path id="path3378" d="M318.806 177.577L318.807 168.261V158.945M318.807 158.945L313.546 164.031M318.807 158.945L323.893 164.205" stroke="#407BFF" stroke-width="2.24515" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="path3380" d="M332.131 158.057V167.374V176.69M332.131 176.69L337.39 171.604M332.131 176.69L327.044 171.43" stroke="#407BFF" stroke-width="2.24515" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="path3382" d="M349.536 150.276H389.574V151.832H349.536V150.276Z" fill="#6C9AFF"/>
                <path id="path3384" opacity="0.4" d="M349.697 150.276H354.447V151.557H349.697V150.276Z" fill="#2550FA"/>
                <path id="path3386" d="M389.053 255.622H382.823V151.557H389.053V255.622Z" fill="#C9CEE2"/>
                <path id="path3388" opacity="0.5" d="M359.684 223.525C358.264 222.104 358.264 219.8 359.684 218.38C361.104 216.959 363.408 216.959 364.828 218.38C366.249 219.8 366.249 222.104 364.828 223.525C363.408 224.945 361.104 224.945 359.684 223.525Z" fill="#407BFF"/>
                <path id="path3390" opacity="0.4" d="M389.053 255.622H382.823V151.557H389.053V255.622Z" fill="#6C9AFF"/>
                <path id="path3392" opacity="0.5" d="M370.458 186.15H353.405V212.842H370.458V186.15Z" fill="#407BFF"/>
                <path id="path3394" opacity="0.5" d="M353.405 186.071V212.329L358.055 189.725L353.405 186.071Z" fill="#407BFF"/>
                <path id="path3396" d="M365.505 195.138L365.769 193.853H362.222L361.958 195.138H360.586L358.073 207.336H364.397L366.91 195.138H365.505Z" fill="#407BFF"/>
                <path id="path3398" opacity="0.4" d="M365.175 199.468L363.882 205.754C363.791 206.199 363.4 206.516 362.947 206.516H359.792C359.424 206.516 359.153 206.183 359.227 205.824L360.521 199.538C360.611 199.093 361.003 198.776 361.456 198.776H364.611C364.978 198.776 365.25 199.109 365.175 199.468Z" fill="white"/>
                <path id="path3400" opacity="0.4" d="M353.405 186.071H370.524V189.725H358.055L353.405 186.071Z" fill="#C9CEE2"/>
                <path id="ELline4" d="M363 220.5C365.5 219.333 371.3 217 374.5 217C378.5 217 381.5 217.5 383.5 220.5C385.5 223.5 387 227 386 234C385 241 385 249 388.5 252.5C392 256 399 256.5 403 254.5C407 252.5 410 248 403.5 245C398.3 242.6 392.333 242.667 390 243" :stroke="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'" stroke-width="6" stroke-linecap="round"/>
                <path id="ELline4" class="animate" :class="propertyList['0xDA'] === '0x43' ? 'reverse' : 'normal'" v-show="propertyList['0xDA'] === '0x42' || propertyList['0xDA'] === '0x43'" d="M363 220.5C365.5 219.333 371.3 217 374.5 217C378.5 217 381.5 217.5 383.5 220.5C385.5 223.5 387 227 386 234C385 241 385 249 388.5 252.5C392 256 399 256.5 403 254.5C407 252.5 410 248 403.5 245C398.3 242.6 392.333 242.667 390 243" :stroke="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'" stroke-width="4"/>
              </g>
            </g>
            <text id="BatteryPercentage1" fill="#2D9E68" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="69.5%" y="278" dominant-baseline="middle" text-anchor="middle">{{propertyList['0xE4'] || '0 %'}}</tspan></text>
            <text id="text1096" fill="#787676" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="572" y="257.295">0%</tspan></text>
            <text id="text1100" fill="#787676" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="572" y="166.295">100%</tspan></text>
            <path id="StandbyButton" d="M500 225H424C419.582 225 416 228.582 416 233V249C416 253.418 419.582 257 424 257H500C504.418 257 508 253.418 508 249V233C508 228.582 504.418 225 500 225Z" :stroke="propertyList['0xDA'] === '0x44' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x44' ? '#3779F5' : 'white'"/>
            <text id="StandbyText" :fill="propertyList['0xDA'] === '0x44' ? 'white' : '#7E7E7E'" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="431" y="245.98">Standby</tspan></text>
            <path id="ChargeButton" d="M500.5 146H424.5C420.358 146 417 149.358 417 153.5V169.5C417 173.642 420.358 177 424.5 177H500.5C504.642 177 508 173.642 508 169.5V153.5C508 149.358 504.642 146 500.5 146Z" :stroke="propertyList['0xDA'] === '0x42' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x42' ? '#3779F5' : 'white'"/>
            <text id="ChargeText" :fill="propertyList['0xDA'] === '0x42' ? 'white' : '#7E7E7E'" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="436" y="166.98">Charge</tspan></text>
            <path id="DischargeButton" d="M500.5 186H423.5C419.358 186 416 189.358 416 193.5V209.5C416 213.642 419.358 217 423.5 217H500.5C504.642 217 508 213.642 508 209.5V193.5C508 189.358 504.642 186 500.5 186Z" :stroke="propertyList['0xDA'] === '0x43' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x43' ? '#3779F5' : 'white'"/>
            <text id="DischargeText" :fill="propertyList['0xDA'] === '0x43' ? 'white' : '#7E7E7E'" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="425" y="206.98">Discharge</tspan></text>
            <text id="ev-charger-discharger-diagram-title-battery" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="374" y="320.98">EV Charger/Discharger</tspan></text>
            <text id="ChargerDischargerType" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="367.164" y="23.98">Charger/Discharger Type&#10;</tspan><tspan x="57.5%" y="45" dominant-baseline="middle" text-anchor="middle">EPC: 0xCC {{propertyList['0xCC']}}</tspan></text>
            <text id="ev-charger-discharger-diagram-title-battery_2" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="416" y="87.98">Operation&#10;</tspan><tspan x="416" y="106.98">Mode&#10;</tspan><tspan x="416" y="125.98">EPC: 0xDA</tspan></text>
            <text id="ev-charger-discharger-diagram-title-battery_3" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="513" y="87.98">Remaining&#10;</tspan><tspan x="513" y="106.98">Energy&#10;</tspan><tspan x="513" y="125.98">EPC: 0xE4</tspan></text>
            <text id="NotConnected" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="172" y="272.98">{{(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'Connected' : 'Not Connected'}}</tspan></text>
            <text id="ElectricPower" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="656.938" y="250.98">{{propertyList['0xD3'] || '0 W'}}</tspan></text>
            <text id="ev-charger-discharger-diagram-title-battery_4" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="643" y="181.98">Electric Power&#10;</tspan><tspan x="643" y="200.98">EPC: 0xD3</tspan></text>
            <g id="Group 1">
              <text id="ev-charger-discharger-diagram-title-battery_5" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="33" y="128.98">Chargeable</tspan></text>
              <text id="ev-charger-discharger-diagram-title-battery_6" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="33" y="151.98">Dischargeable</tspan></text>
              <text id="ev-charger-discharger-diagram-title-battery_7" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="35" y="72.98">Vehicle Status&#10;</tspan><tspan x="35" y="91.98">EPC: 0xC7</tspan></text>
              <circle id="Chargeable" cx="154" cy="124" r="8" :fill="(propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x43') ? 'green' : (propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x42') ? 'red' : '#bbbbbb'"/>
              <circle id="Dischargeable" cx="154" cy="146" r="8" :fill="(propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43') ? 'green' : (propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41') ? 'red' : '#bbbbbb'"/>
            </g>
            <g id="ev-charger-discharger-diagram-icon-battery-remaining">
              <path id="rect1080" d="M541 154.666V254.187C541 255.741 542.252 257 543.797 257H562.488C564.033 257 565.285 255.741 565.285 254.187V154.666C565.285 153.112 564.033 151.853 562.488 151.853H543.797C542.252 151.853 541 153.112 541 154.666Z" fill="#47E298" stroke="#5AC491"/>
              <path id="path1082" d="M547.783 148.25C547.783 147.007 548.784 146 550.021 146H556.264C557.501 146 558.502 147.007 558.502 148.25V149.646H547.783V148.25Z" fill="#5AC391"/>
              <path id="rect1084" d="M559.326 156.115H546.959C546.032 156.115 545.281 156.871 545.281 157.803V251.212C545.281 252.144 546.032 252.899 546.959 252.899H559.326C560.253 252.899 561.004 252.144 561.004 251.212V157.803C561.004 156.871 560.253 156.115 559.326 156.115Z" fill="white"/>
            </g>
            <line id="Line 1" x1="295" y1="61.5" x2="626" y2="61.5" stroke="#A3A3A3"/>
            <rect id="BatteryPercentage2" x="-562" y="-253" width="19" :height="propertyList['0xE4']?.replace(/\s|%/g, '') * 0.98 || 0" fill="#47E298" style="fill: rgb(71 226 152);fill-opacity:1;stroke:none;stroke-width:8.42334;transform: rotate(180deg) scale(1);width: 18px;"/>
          </g>
        </svg>
      </div>
      <div class="card-body d-grid justify-items-center align-content-start gap-4 form-check" style="border-left: 1px solid rgba(0,0,0,.125);">
        <h3 class="fs-6 text-primary fw-normal">SET</h3>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button" @click="setEVChargerDischargerPropertiesSimpleMode('charging')">0xDA(0x42)<br/>Charging</button>
          <button class="btn btn-primary" type="button" @click="setEVChargerDischargerPropertiesSimpleMode('discharging')">0xDA(0x43)<br/>Discharging</button>
          <button class="btn btn-primary" type="button" @click="setEVChargerDischargerPropertiesSimpleMode('standby')">0xDA(0x44)<br/>Standby</button>
        </div>
        <div class="card shadow p-3 gap-2" v-show="false">
          <div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-discharger-operation-mode-42" type="radio" name="f-ev-charger-discharger-operation-mode" value="0x42">
              <label class="form-check-label" for="f-ev-charger-discharger-operation-mode-42">
                Charging: 0x42
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-discharger-operation-mode-43" type="radio" name="f-ev-charger-discharger-operation-mode" value="0x43">
              <label class="form-check-label" for="f-ev-charger-discharger-operation-mode-43">
                Discharging: 0x43
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-discharger-operation-mode-44" type="radio" name="f-ev-charger-discharger-operation-mode" value="0x44">
              <label class="form-check-label" for="f-ev-charger-discharger-operation-mode-44">
                Standby: 0x44
              </label>
            </div>
          </div>
          <h4 class="small">Charge Amount: 0xE7</h4>
          <div class="grid gap-1 align-items-center" style="--bs-columns: 4;">
            <input class="form-control h-100" id="f-ev-charger-discharger-charge-amount">
          </div>
          <h4 class="small">Discharge Amount: 0xEA</h4>
          <div class="grid gap-1 align-items-center" style="--bs-columns: 4;">
            <input class="form-control h-100" id="f-ev-charger-discharger-discharge-amount">
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="cameraViewType === 'diagram_evcharger'">
      <div class="card flex-grow-1 d-grid grid-template-100" style="padding: 50px; border: none;">
        <svg width="798" height="325" viewBox="0 0 798 325" style="height: 100%; width: 100%;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="ELline5" d="M794 154.5C772.5 179 749.4 227 627 227" :stroke="propertyList['0xD3'] && propertyList['0xD3']?.replace(/\s|W/g, '') != 0 ? 'orange' : '#bbbbbb'" stroke-width="6" stroke-linecap="round"/>
          <path id="ELline5" class="animate" :class="propertyList['0xD3']?.replace(/\s|W/g, '') > 0 ? 'normal' : 'reverse'" v-show="propertyList['0xD3'] && propertyList['0xD3']?.replace(/\s|W/g, '') != 0" d="M794 154.5C772.5 179 749.4 227 627 227" stroke-linejoin="round"/>
          <rect id="Rectangle 1" x="294.5" y="0.5" width="332" height="293" rx="6.5" stroke="#A3A3A3" fill="white"/>
          <g id="ev-charger-diagram-battery">
            <g id="ev-charger-diagram-icon-battery">
              <g id="g3468">
                <g id="g3364">
                  <path id="path3308" d="M111.429 211.034C111.429 211.034 111.389 211.034 111.374 211.034H96.0284C89.423 211.034 84.0678 219.532 84.0678 230.016C84.0678 240.502 89.423 249 96.0284 249H111.374C111.374 249 111.414 249 111.429 249C118.035 249 123.39 240.502 123.39 230.016C123.39 219.532 118.035 211.034 111.429 211.034Z" fill="#B5C1D6"/>
                  <path id="path3310" opacity="0.2" d="M111.429 211.034C111.429 211.034 111.389 211.034 111.374 211.034H96.0284C89.423 211.034 84.0678 219.532 84.0678 230.016C84.0678 240.502 89.423 249 96.0284 249H111.374C111.374 249 111.414 249 111.429 249C118.035 249 123.39 240.502 123.39 230.016C123.39 219.532 118.035 211.034 111.429 211.034Z" fill="#B6C0D4"/>
                  <path id="path3312" d="M42.2767 211.034C42.2767 211.034 42.2367 211.034 42.2217 211.034H26.8759C20.2705 211.034 14.9153 219.532 14.9153 230.016C14.9153 240.502 20.2705 249 26.8759 249H42.2217C42.2217 249 42.2617 249 42.2767 249C48.8821 249 54.2373 240.502 54.2373 230.016C54.2373 219.532 48.8821 211.034 42.2767 211.034Z" fill="#B5C1D6"/>
                  <path id="path3314" opacity="0.2" d="M42.2767 211.034C42.2767 211.034 42.2367 211.034 42.2217 211.034H26.8759C20.2705 211.034 14.9153 219.532 14.9153 230.016C14.9153 240.502 20.2705 249 26.8759 249H42.2217C42.2217 249 42.2617 249 42.2767 249C48.8821 249 54.2373 240.502 54.2373 230.016C54.2373 219.532 48.8821 211.034 42.2767 211.034Z" fill="#B7BFCD"/>
                  <path id="path3316" opacity="0.2" d="M39.3221 243.576C43.8152 243.576 47.4576 238.112 47.4576 231.373C47.4576 224.633 43.8152 219.169 39.3221 219.169C34.829 219.169 31.1865 224.633 31.1865 231.373C31.1865 238.112 34.829 243.576 39.3221 243.576Z" fill="#E3E7F0"/>
                  <path id="path3320" d="M193.823 216.378C193.219 209.79 191.507 203.356 188.755 197.352L187.57 194.763H158.644L173.638 238.153C178.91 236.831 183.8 234.272 187.897 230.686L188.244 230.381C192.237 226.886 194.315 221.679 193.828 216.378H193.823Z" fill="#EFF8FF"/>
                  <path id="path3322" opacity="0.5" d="M193.824 216.378C193.218 209.789 191.508 203.355 188.754 197.351L187.569 194.763H158.644L173.638 238.153C178.909 236.831 183.8 234.273 187.896 230.687L188.244 230.382C192.236 226.886 194.314 221.68 193.829 216.378H193.824Z" fill="#E1EDFF"/>
                  <path id="path3324" d="M155.608 249C149.048 249 143.729 240.502 143.729 230.016C143.729 219.532 149.048 211.034 155.608 211.034H170.847V249H155.608Z" fill="#B7BFCD"/>
                  <path id="path3326" d="M170.847 249C177.587 249 183.051 240.502 183.051 230.016C183.051 219.532 177.587 211.034 170.847 211.034C164.108 211.034 158.644 219.532 158.644 230.016C158.644 240.502 164.108 249 170.847 249Z" fill="#818894"/>
                  <path id="path3328" opacity="0.2" d="M170.847 242.22C175.341 242.22 178.983 236.757 178.983 230.016C178.983 223.277 175.341 217.814 170.847 217.814C166.355 217.814 162.712 223.277 162.712 230.016C162.712 236.757 166.355 242.22 170.847 242.22Z" fill="#E3E7F0"/>
                  <path id="path3330" d="M69.3053 238.153L40.678 192.003C40.678 192.003 63.327 169 112.811 169C155.645 169 181.301 183.208 188.475 194.657L171.494 211.376C155.053 211.376 155.157 228.883 152.903 236.242C152.555 237.382 151.518 238.147 150.309 238.147H69.3053" fill="#E1EDFF"/>
                  <path id="path3332" opacity="0.5" d="M66.5935 238.153L37.9661 192.003C37.9661 192.003 60.6151 169 110.1 169C152.933 169 178.589 183.208 185.763 194.657L168.783 211.376C152.341 211.376 152.446 228.883 150.191 236.242C149.843 237.382 148.807 238.147 147.598 238.147H66.5935" fill="#E1EDFF"/>
                  <path id="path3334" d="M86.4547 249C79.8947 249 74.5763 240.502 74.5763 230.016C74.5763 219.532 79.8947 211.034 86.4547 211.034H101.695V249H86.4547Z" fill="#B7BFCD"/>
                  <path id="path3336" d="M102.373 249C108.738 249 113.898 240.502 113.898 230.016C113.898 219.532 108.738 211.034 102.373 211.034C96.0076 211.034 90.8475 219.532 90.8475 230.016C90.8475 240.502 96.0076 249 102.373 249Z" fill="#818894"/>
                  <path id="path3338" opacity="0.2" d="M101.695 242.22C106.188 242.22 109.831 236.757 109.831 230.016C109.831 223.277 106.188 217.814 101.695 217.814C97.2018 217.814 93.5593 223.277 93.5593 230.016C93.5593 236.757 97.2018 242.22 101.695 242.22Z" fill="#E3E7F0"/>
                  <path id="path3340" d="M81.1764 234.205C82.632 225.599 91.1963 211.339 102.036 211.339L112.542 192.051H40.5557C35.9655 192.051 14.5053 199.821 6.69106 207.65C1.21668 213.131 0.650366 218.645 0.00456707 232.682C-0.124593 235.549 2.5033 238.012 5.66275 238.012C32.22 238.023 64.3609 238.117 76.0598 238.152C78.643 238.162 80.784 236.51 81.1715 234.205H81.1764Z" fill="#EFF8FF"/>
                  <path id="path3342" opacity="0.5" d="M81.1765 234.205C82.632 225.599 91.1605 211.5 102 211.5L112.542 192.051H40.5557C35.9656 192.051 14.5052 199.821 6.69107 207.65C1.21668 213.131 0.650366 218.645 0.00456706 232.682C-0.124593 235.549 2.50331 238.012 5.66276 238.012C32.22 238.023 64.3608 238.117 76.0598 238.153C78.6429 238.162 80.784 236.51 81.1714 234.205H81.1765Z" fill="#D2E2FF"/>
                  <path id="path3348" opacity="0.3" d="M135.859 238.153C135.809 238.153 135.753 238.138 135.708 238.109C135.588 238.029 135.558 237.867 135.638 237.748C135.738 237.6 145.909 222.533 145.909 192.312C145.909 192.169 146.03 192.051 146.175 192.051C146.32 192.051 146.441 192.169 146.441 192.312C146.441 222.711 136.185 237.891 136.08 238.039C136.029 238.113 135.944 238.153 135.859 238.153Z" fill="#407BFF"/>
                  <path id="path3350" opacity="0.3" d="M26.0798 215.102C26.0798 215.102 26.0403 215.102 26.0205 215.097L12.4069 211.608C12.2684 211.569 12.1794 211.415 12.2091 211.262C12.2387 211.106 12.3821 211.007 12.5206 211.04L26.0897 214.518L48.5253 211.669C48.6687 211.653 48.7972 211.762 48.8121 211.923C48.8269 212.083 48.7281 212.225 48.5846 212.242L26.1046 215.097C26.1046 215.097 26.0848 215.097 26.0749 215.097L26.0798 215.102Z" fill="#407BFF"/>
                  <path id="path3352" opacity="0.3" d="M171.117 211.034C171.047 211.034 170.98 211.009 170.924 210.956C170.822 210.856 170.822 210.697 170.924 210.597C175.831 206.067 178.443 195.491 178.443 189.593C178.443 189.454 178.565 189.339 178.713 189.339C178.861 189.339 178.983 189.454 178.983 189.593C178.983 195.577 176.315 206.332 171.306 210.956C171.256 211.005 171.184 211.029 171.117 211.029V211.034Z" fill="#407BFF"/>
                <g id="Group 2">
                  <path id="path3318" d="M188.475 196.119L191.905 199.14C193.528 200.569 194.237 202.809 193.744 204.944L192.961 208.322L188.478 196.119H188.475Z" fill="#407BFF"/>
                  <path id="path3344" d="M112.891 169C63.661 169 41.1962 191.695 40.6829 192.046H40.678L90.4911 192.051C90.4911 192.051 111.909 173.439 126.102 169.476C121.901 169.165 117.491 169 112.891 169Z" fill="#407BFF"/>
                  <path id="path3346" d="M51.3513 211.02C58.1154 208.483 78.5266 201.348 84.0928 203.202C89.6591 205.055 76.1798 211.676 72.7828 212.556C69.3908 213.436 67.1575 211.676 62.0744 214.111C56.9913 216.546 43.1621 214.097 51.3462 211.02H51.3513Z" fill="#407BFF"/>
                  <path id="path3354" d="M132.568 197.475H139.974C140.546 197.475 141.017 196.864 141.017 196.12C141.017 195.373 140.546 194.763 139.974 194.763H132.568C131.995 194.763 131.525 195.373 131.525 196.12C131.525 196.864 131.995 197.475 132.568 197.475Z" fill="#407BFF"/>
                  <path id="path3356" d="M162.399 197.475H169.804C170.378 197.475 170.847 196.864 170.847 196.12C170.847 195.373 170.378 194.763 169.804 194.763H162.399C161.826 194.763 161.356 195.373 161.356 196.12C161.356 196.864 161.826 197.475 162.399 197.475Z" fill="#407BFF"/>
                  <path id="path3358" d="M11.9646 212.137C10.6197 211.23 8.42412 209.794 5.93391 208.322C4.50822 210.036 3.47223 211.794 2.71185 213.815C3.46272 213.985 4.32288 214.374 5.39215 215.287C8.56669 218 17.0685 215.599 11.9646 212.137Z" fill="#407BFF"/>
                  <path id="path3360" d="M98.983 192.051H168.798C172.366 192.051 175.873 191.102 178.983 189.295C178.983 189.295 167.688 178.717 144.942 174.159C135.597 172.284 126.736 171.558 124.012 171.739C117.515 175.266 107.559 182.688 98.983 192.051Z" fill="#407BFF"/>
                </g>
                  <path id="path3362" d="M56.9346 234.085H8.14515C6.97098 234.085 6.34705 232.726 7.12328 231.864L8.38588 230.466C8.64627 230.182 9.01472 230.017 9.40776 230.017H55.6769C56.0652 230.017 56.4385 230.182 56.6988 230.466L57.9615 231.864C58.7377 232.726 58.1137 234.085 56.9396 234.085H56.9346Z" fill="#B7BFCD"/>
                </g>
                <path id="ELline1" d="M342.5 251.994H241.286C232.55 252.125 132 254.5 140.5 243.5C144 230 143 228.5 140.5 214.5C138.959 212.535 143.167 205.185 155.5 205.5" :stroke="propertyList['0xE4'] ? 'orange' : '#bbbbbb'" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="ELline1" class="animate normal" v-show="propertyList['0xDA'] === '0x42'" d="M342.5 251.994H241.286C232.55 252.125 132 254.5 140.5 243.5C144 230 143 228.5 140.5 214.5C138.959 212.535 143.167 205.185 155.5 205.5" stroke-linejoin="round"/>
                <path id="ELline2" d="M160.235 209.287L157 210V200L160.235 200.713C160.674 200.808 161 201.486 161 202.281V207.712C161 208.514 160.669 209.186 160.235 209.281V209.287Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'"/>
                <path id="ELline3" d="M159 201V209C156.792 209 155 207.207 155 205C155 202.793 156.792 201 159 201Z" :fill="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'"/>
                <path id="path3372" d="M341.541 152.043H384.545V255.105H341.541V152.043Z" fill="#EFF8FF"/>
                <path id="path3374" d="M368.19 167.38H362.628L367.49 159.614H361.378L357.295 170.585H362.377L359.277 180.494L368.19 167.38Z" fill="#407BFF" fill-opacity="0.5"/>
                <path id="path3376" d="M368.19 167.38H362.628L358.657 166.877L357.295 170.586H362.377L359.277 180.494L368.19 167.38Z" fill="#407BFF"/>
                <path id="path3380" d="M332.131 158.057V167.374V176.69M332.131 176.69L337.39 171.604M332.131 176.69L327.044 171.43" stroke="#407BFF" stroke-width="2.24515" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="path3382" d="M349.536 150.276H389.574V151.832H349.536V150.276Z" fill="#6C9AFF"/>
                <path id="path3384" opacity="0.4" d="M349.697 150.276H354.447V151.557H349.697V150.276Z" fill="#2550FA"/>
                <path id="path3386" d="M389.053 255.622H382.823V151.557H389.053V255.622Z" fill="#C9CEE2"/>
                <path id="path3388" opacity="0.5" d="M359.684 223.525C358.264 222.104 358.264 219.8 359.684 218.38C361.104 216.959 363.408 216.959 364.828 218.38C366.249 219.8 366.249 222.104 364.828 223.525C363.408 224.945 361.104 224.945 359.684 223.525Z" fill="#407BFF"/>
                <path id="path3390" opacity="0.4" d="M389.053 255.622H382.823V151.557H389.053V255.622Z" fill="#6C9AFF"/>
                <path id="path3392" opacity="0.5" d="M370.458 186.15H353.405V212.842H370.458V186.15Z" fill="#407BFF"/>
                <path id="path3394" opacity="0.5" d="M353.405 186.071V212.329L358.055 189.725L353.405 186.071Z" fill="#407BFF"/>
                <path id="path3396" d="M365.505 195.138L365.769 193.853H362.222L361.958 195.138H360.586L358.073 207.336H364.397L366.91 195.138H365.505Z" fill="#407BFF"/>
                <path id="path3398" opacity="0.4" d="M365.175 199.468L363.882 205.754C363.791 206.199 363.4 206.516 362.947 206.516H359.792C359.424 206.516 359.153 206.183 359.227 205.824L360.521 199.538C360.611 199.093 361.003 198.776 361.456 198.776H364.611C364.978 198.776 365.25 199.109 365.175 199.468Z" fill="white"/>
                <path id="path3400" opacity="0.4" d="M353.405 186.071H370.524V189.725H358.055L353.405 186.071Z" fill="#C9CEE2"/>
                <path id="ELline4" d="M363 220.5C365.5 219.333 371.3 217 374.5 217C378.5 217 381.5 217.5 383.5 220.5C385.5 223.5 387 227 386 234C385 241 385 249 388.5 252.5C392 256 399 256.5 403 254.5C407 252.5 410 248 403.5 245C398.3 242.6 392.333 242.667 390 243" :stroke="propertyList['0xE4'] ? 'orange' : '#bbbbbb'" stroke-width="6" stroke-linecap="round"/>
                <path id="ELline4" class="animate normal" v-show="propertyList['0xDA'] === '0x42'" d="M363 220.5C365.5 219.333 371.3 217 374.5 217C378.5 217 381.5 217.5 383.5 220.5C385.5 223.5 387 227 386 234C385 241 385 249 388.5 252.5C392 256 399 256.5 403 254.5C407 252.5 410 248 403.5 245C398.3 242.6 392.333 242.667 390 243" :stroke="(propertyList['0xC7'] === '0x40' || propertyList['0xC7'] === '0x41' || propertyList['0xC7'] === '0x42' || propertyList['0xC7'] === '0x43' || propertyList['0xC7'] === '0x44') ? 'orange' : '#bbbbbb'" stroke-width="4"/>
              </g>
            </g>
            <text id="BatteryPercentage1" fill="#2D9E68" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="69.5%" y="278" dominant-baseline="middle" text-anchor="middle">{{propertyList['0xE4'] || '0 %'}}</tspan></text>
            <text id="text1096" fill="#787676" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="572" y="257.295">0%</tspan></text>
            <text id="text1100" fill="#787676" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="14" letter-spacing="0em"><tspan x="572" y="166.295">100%</tspan></text>
            <path id="StandbyButton" d="M500 225H424C419.582 225 416 228.582 416 233V249C416 253.418 419.582 257 424 257H500C504.418 257 508 253.418 508 249V233C508 228.582 504.418 225 500 225Z" :stroke="propertyList['0xDA'] === '0x44' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x44' ? '#3779F5' : 'white'"/>
            <text id="StandbyText" :fill="propertyList['0xDA'] === '0x44' ? 'white' : '#7E7E7E'" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="445" y="245.98">Idle</tspan></text>
            <path id="ChargeButton" d="M500.5 146H424.5C420.358 146 417 149.358 417 153.5V169.5C417 173.642 420.358 177 424.5 177H500.5C504.642 177 508 173.642 508 169.5V153.5C508 149.358 504.642 146 500.5 146Z" :stroke="propertyList['0xDA'] === '0x42' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x42' ? '#3779F5' : 'white'"/>
            <text id="ChargeText" :fill="propertyList['0xDA'] === '0x42' ? 'white' : '#7E7E7E'" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="436" y="166.98">Charge</tspan></text>
            <path id="ChargeButton" d="M500.5 186H423.5C419.358 186 416 189.358 416 193.5V209.5C416 213.642 419.358 217 423.5 217H500.5C504.642 217 508 213.642 508 209.5V193.5C508 189.358 504.642 186 500.5 186Z" :stroke="propertyList['0xDA'] === '0x43' ? 'white' : '#909090'" :fill="propertyList['0xDA'] === '0x43' ? '#3779F5' : 'white'"/>
            <text id="ChargeText" :fill="propertyList['0xDA'] === '0x43' ? 'white' : '#7E7E7E'" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="432" y="206.98">Standby</tspan></text>
            <text id="ev-charger-diagram-title-battery" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="415" y="320.98">EV Charger</tspan></text>
            <text id="ChargerType" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="407.164" y="23.98">Charger Type&#10;</tspan><tspan x="57.5%" y="45" dominant-baseline="middle" text-anchor="middle">EPC: 0xCC {{propertyList['0xCC']}}</tspan></text>
            <text id="ev-charger-diagram-title-battery_2" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="416" y="87.98">Operation&#10;</tspan><tspan x="416" y="106.98">Mode&#10;</tspan><tspan x="416" y="125.98">EPC: 0xDA</tspan></text>
            <text id="ev-charger-diagram-title-battery_3" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="513" y="87.98">Remaining&#10;</tspan><tspan x="513" y="106.98">Energy&#10;</tspan><tspan x="513" y="125.98">EPC: 0xE4</tspan></text>
            <text id="NotConnected" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rubik" font-size="16" letter-spacing="0em"><tspan x="172" y="272.98">{{propertyList['0xE4'] ? 'Connected' : 'Not Connected'}}</tspan></text>
            <g id="ev-charger-diagram-icon-battery-remaining">
              <path id="rect1080" d="M541 154.666V254.187C541 255.741 542.252 257 543.797 257H562.488C564.033 257 565.285 255.741 565.285 254.187V154.666C565.285 153.112 564.033 151.853 562.488 151.853H543.797C542.252 151.853 541 153.112 541 154.666Z" fill="#47E298" stroke="#5AC491"/>
              <path id="path1082" d="M547.783 148.25C547.783 147.007 548.784 146 550.021 146H556.264C557.501 146 558.502 147.007 558.502 148.25V149.646H547.783V148.25Z" fill="#5AC391"/>
              <path id="rect1084" d="M559.326 156.115H546.959C546.032 156.115 545.281 156.871 545.281 157.803V251.212C545.281 252.144 546.032 252.899 546.959 252.899H559.326C560.253 252.899 561.004 252.144 561.004 251.212V157.803C561.004 156.871 560.253 156.115 559.326 156.115Z" fill="white"/>
            </g>
            <line id="Line 1" x1="295" y1="61.5" x2="626" y2="61.5" stroke="#A3A3A3"/>
            <rect id="BatteryPercentage2" x="-562" y="-253" width="19" :height="propertyList['0xE4']?.replace(/\s|%/g, '') * 0.98 || 0" fill="#47E298" style="fill: rgb(71 226 152);fill-opacity:1;stroke:none;stroke-width:8.42334;transform: rotate(180deg) scale(1);width: 18px;"/>
          </g>
        </svg>
      </div>
      <div class="card-body d-grid justify-items-center align-content-start gap-4 form-check" style="border-left: 1px solid rgba(0,0,0,.125);">
        <h3 class="fs-6 text-primary fw-normal">SET</h3>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button" @click="setEVChargerPropertiesSimpleMode('charging')">0xDA(0x42)<br/>Charging</button>
          <button class="btn btn-primary" type="button" @click="setEVChargerPropertiesSimpleMode('standby')">0xDA(0x44)<br/>Standby</button>
          <button class="btn btn-primary" type="button" @click="setEVChargerPropertiesSimpleMode('idle')">0xDA(0x47)<br/>Idle</button>
        </div>
        <div class="card shadow p-3 gap-2" v-show="false">
          <div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-operation-mode-42" type="radio" name="f-ev-charger-operation-mode" value="0x42">
              <label class="form-check-label" for="f-ev-charger-operation-mode-42">
                Charging: 0x42
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-operation-mode-44" type="radio" name="f-ev-charger-operation-mode" value="0x44">
              <label class="form-check-label" for="f-ev-charger-operation-mode-44">
                Standby: 0x44
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-operation-mode-47" type="radio" name="f-ev-charger-operation-mode" value="0x47">
              <label class="form-check-label" for="f-ev-charger-operation-mode-47">
                Idle: 0x47
              </label>
            </div>
          </div>
          <h4 class="small">Charge Amount: 0xE7</h4>
          <div class="grid gap-1 align-items-center" style="--bs-columns: 4;">
            <input class="form-control h-100" id="f-ev-charger-charge-amount">
          </div>
        </div>
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
          release      = computed(() => device.value.ip ? nodes.value[device.value.ip][device.value.eoj.class][device.value.eoj.id].release : ''),
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
        let epcStr = epc.toHex(2).toUpperCase().prefix('0x')

        let propertyDescription = store.getters.propertyDescription(0x0000, epc, release.value);
        propertyDescription = store.getters.propertyDescription(device.value.eoj.class, epc, release.value) || propertyDescription;
        if (propertyDescription === null) { return; }

        let edt = store.getters.data(device.value.ip, device.value.eoj, epc);
        if (edt.length === 0) { return; }

        const propertyValue = store.getters.decodedData(epc, edt, propertyDescription);
        const edtValue = (() => { let hex = ''; edt.forEach((v: number) => { hex += v.toHex(2).toUpperCase(); }); return hex.prefix('0x'); })()

        epc_edt_List[epcStr] = epcStr === '0xE4' || epcStr === '0xD3' || epcStr === '0xCC' ? (propertyValue === null ? '' : propertyValue) : edtValue;
      });

      propertyList.value = epc_edt_List;
    }

    /*
    Set ev charger discharger properties
    */
    function setEVChargerDischargerProperties() {
      if (device.value.ip === '') { return; }

      const epcList: number[] = [],
            edtList = [];

      // Operation Mode: 0xDA
      const mode = (document.querySelector('input[name="f-ev-charger-discharger-operation-mode"]:checked') as HTMLInputElement)?.value;
      if (!mode) { return; }

      const chargeAmountField = document.getElementById('f-ev-charger-discharger-charge-amount') as HTMLInputElement,
            dischargeAmountField = document.getElementById('f-ev-charger-discharger-discharge-amount') as HTMLInputElement;
      let chargeAmount = 0,
          dischargeAmount = 0;

      // Reset errors
      chargeAmountField.classList.remove('is-invalid');
      dischargeAmountField.classList.remove('is-invalid');

      switch (mode) {
        // Charging
        case '0x42':
          if (chargeAmountField.value === '' || Number.isNaN(chargeAmountField.value)) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }

          chargeAmount = parseInt(chargeAmountField.value);
          if (chargeAmount < 0 || device.value.chargeableElectricity < chargeAmount) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }

          epcList.push(0xE7);
          edtList.push(chargeAmount.toHex(8).toUint8Array());

          epcList.push(0xEB);
          edtList.push([0x00, 0x00, 0x07, 0xD0]);

          epcList.push(0xDA);
          edtList.push([0x42]);
          break;
        // Discharging
        case '0x43':
          if (dischargeAmountField.value === '' || Number.isNaN(dischargeAmountField.value)) {
            dischargeAmountField.classList.add('is-invalid');
            return;
          }

          dischargeAmount = parseInt(dischargeAmountField.value);
          if (dischargeAmount < 0 || device.value.dischargeableElectricity < dischargeAmount) {
            dischargeAmountField.classList.add('is-invalid');
            return;
          }

          epcList.push(0xEA);
          edtList.push(dischargeAmount.toHex(8).toUint8Array());

          epcList.push(0xEC);
          edtList.push([0x00, 0x00, 0x07, 0xD0]);

          epcList.push(0xDA);
          edtList.push([0x43]);
          break;
        // Standby
        case '0x44':
          epcList.push(0xDA);
          edtList.push([0x44]);
          break;
      }

      for (let i = 0; i < epcList.length; i++) {
        // Set property
        store.dispatch('sendEL', {
          ip: device.value.ip,
          el: {
            deoj: device.value.eoj,
            esv: 0x61,
            opc: {
              ops: [
                {
                  epc: epcList[i],
                  edt: edtList[i]
                }
              ]
            }
          }
        });

        // Get property
        setTimeout(() => {
          store.dispatch('sendEL', {
          ip: device.value.ip,
          el: {
            deoj: device.value.eoj,
            esv: 0x62,
            opc: {
              ops: [
                {
                  epc: epcList[i],
                  edt: []
                }
              ]
            }
          }
        });
        }, 1000);
      }
    }

    /*
    Set ev charger discharger properties during the SimpleMode
    */
    function setEVChargerDischargerPropertiesSimpleMode(mode: string) {
      switch (mode) {
        case 'charging':
          document.getElementById('f-ev-charger-discharger-operation-mode-42')!.click();
          (document.getElementById('f-ev-charger-discharger-charge-amount') as HTMLInputElement).value = '0';
          break;
        case 'discharging':
          document.getElementById('f-ev-charger-discharger-operation-mode-43')!.click();
          (document.getElementById('f-ev-charger-discharger-discharge-amount') as HTMLInputElement).value = '0';
          break;
        case 'standby':
          document.getElementById('f-ev-charger-discharger-operation-mode-44')!.click();
          break;
      }

      setEVChargerDischargerProperties();
    }

    /*
    Set ev charger properties
    */
    function setEVChargerProperties() {
      if (device.value.ip === '') { return; }

      const epcList: number[] = [],
            edtList = [];

      // Operation Mode: 0xDA
      const mode = (document.querySelector('input[name="f-ev-charger-operation-mode"]:checked') as HTMLInputElement)?.value;
      if (!mode) { return; }

      const chargeAmountField = document.getElementById('f-ev-charger-charge-amount') as HTMLInputElement;
      let chargeAmount = 0;

      // Reset errors
      chargeAmountField.classList.remove('is-invalid');

      switch (mode) {
        // Charging
        case '0x42':
          if (chargeAmountField.value === '' || Number.isNaN(chargeAmountField.value)) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }

          chargeAmount = parseInt(chargeAmountField.value);
          if (chargeAmount < 0 || device.value.chargeableElectricity < chargeAmount) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }

          epcList.push(0xE7);
          edtList.push(chargeAmount.toHex(8).toUint8Array());

          epcList.push(0xEB);
          edtList.push([0x00, 0x00, 0x07, 0xD0]);

          epcList.push(0xDA);
          edtList.push([0x42]);
          break;
        // Standby
        case '0x44':
          epcList.push(0xDA);
          edtList.push([0x44]);
          break;
        // Idle
        case '0x47':
          epcList.push(0xDA);
          edtList.push([0x47]);
          break;
      }

      for (let i = 0; i < epcList.length; i++) {
        // Set property
        store.dispatch('sendEL', {
          ip: device.value.ip,
          el: {
            deoj: device.value.eoj,
            esv: 0x61,
            opc: {
              ops: [
                {
                  epc: epcList[i],
                  edt: edtList[i]
                }
              ]
            }
          }
        });

        // Get property
        setTimeout(() => {
          store.dispatch('sendEL', {
          ip: device.value.ip,
          el: {
            deoj: device.value.eoj,
            esv: 0x62,
            opc: {
              ops: [
                {
                  epc: epcList[i],
                  edt: []
                }
              ]
            }
          }
        });
        }, 1000);
      }
    }

    /*
    Set ev charger properties during the SimpleMode
    */
    function setEVChargerPropertiesSimpleMode(mode: string) {
      switch (mode) {
        case 'charging':
          document.getElementById('f-ev-charger-operation-mode-42')!.click();
          (document.getElementById('f-ev-charger-charge-amount') as HTMLInputElement).value = '0';
          break;
        case 'standby':
          document.getElementById('f-ev-charger-operation-mode-44')!.click();
          break;
        case 'idle':
          document.getElementById('f-ev-charger-operation-mode-47')!.click();
          break;
      }

      setEVChargerProperties();
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
      propertyList,
      setEVChargerDischargerPropertiesSimpleMode,
      setEVChargerPropertiesSimpleMode,
    };
  }
});
</script>

<style lang="scss" scoped>
.camera-switcher {
  grid-template-columns: minmax(0, 1fr) 180px;
}
.animate {
  stroke:                  black;
  stroke-width:              4px;
  stroke-dasharray:          6px 6px;
  stroke-dashoffset:         5;
  animation-name:            current;
  animation-duration:        18s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  &.normal {
    animation-direction:       normal;
  }
  &.reverse {
    animation-direction:       reverse;
  }
}
@keyframes current {
  0% {
    stroke-dashoffset: 455;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
