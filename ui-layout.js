/** 
 * Dynamically builds the UI layout that was previously inline in index.html.
 * Ensures all IDs/classes remain identical for existing code compatibility.
 */
(function buildUILayout() {
  const toolbar = document.getElementById('toolbar');
  if (!toolbar) return;

  const rightToolbar = document.getElementById('right-toolbar');
  const bottomToolbar = document.getElementById('bottom-toolbar');

  // Toolbar content
  toolbar.innerHTML = `\n      
      <h2>Level Editor</h2>
      
      <div class=\"section-header\">
        <h3>Tools</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <button class=\"tool-button active icon-only\" id=\"place-block\" title=\"Place Block\" aria-label=\"Place Block\">⬛</button>
        <button class=\"tool-button icon-only\" id=\"place-asset\" title=\"Place Asset\" aria-label=\"Place Asset\">⧉</button>
        <button class=\"tool-button icon-only\" id=\"color-dropper\" title=\"Color Dropper\" aria-label=\"Color Dropper\">🎨</button>
        <button class=\"tool-button icon-only\" id=\"select-tool\" title=\"Select\" aria-label=\"Select\">⌖</button> 
        <button class=\"tool-button icon-only\" id=\"drag-mode\" title=\"Drag Mode (Orbit)\" aria-label=\"Drag Mode\">🖐</button>
        <button class=\"tool-button icon-only\" id=\"move-mode\" title=\"Move Mode\" aria-label=\"Move Mode\">✥</button>
        <button class=\"tool-button icon-only\" id=\"rotation-mode\" title=\"Rotation Mode\" aria-label=\"Rotation Mode\">⟲</button>
        <button class=\"tool-button icon-only\" id=\"remove-block\" title=\"Remove Block\" aria-label=\"Remove Block\">🗑</button>
        <button class=\"tool-button icon-only\" id=\"export-json\" title=\"Export JSON\" aria-label=\"Export JSON\">⭳</button>
        <input type=\"file\" id=\"import-input\" accept=\".json\" style=\"display: none;\">
        <button class=\"tool-button icon-only\" id=\"import-json\" title=\"Import JSON\" aria-label=\"Import JSON\">⭱</button>
        <button class=\"tool-button icon-only\" id=\"undo-action\" title=\"Undo\" aria-label=\"Undo\">↶</button>
        <button class=\"tool-button icon-only\" id=\"redo-action\" title=\"Redo\" aria-label=\"Redo\" disabled>↷</button>
        <button class=\"tool-button icon-only\" id=\"cheatsheet-btn\" title=\"Shortcuts\" aria-label=\"Shortcuts\">⌨</button>
      </div>

      <div class=\"section-header\">
        <h3>Block Settings</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div class=\"block-settings\">
          <div class=\"icon-group\" id=\"block-type-group\" aria-label=\"Block Type\">
            <button class=\"icon-toggle\" id=\"block-type-half\" title=\"Half Block ▭\" aria-pressed=\"false\">▭</button>
            <button class=\"icon-toggle\" id=\"block-type-full\" title=\"Full Block ⬛\" aria-pressed=\"false\">⬛</button>
            <button class=\"icon-toggle\" id=\"block-type-stair\" title=\"Stair Block ⟫\" aria-pressed=\"false\">⟫</button>
          </div>
          <div class=\"icon-group\" id=\"block-orientation-group\" aria-label=\"Block Orientation\">
            <button class=\"icon-toggle\" id=\"orient-north\" title=\"North ↑\" aria-pressed=\"false\">↑</button>
            <button class=\"icon-toggle\" id=\"orient-east\" title=\"East →\" aria-pressed=\"false\">→</button>
            <button class=\"icon-toggle\" id=\"orient-south\" title=\"South ↓\" aria-pressed=\"false\">↓</button>
            <button class=\"icon-toggle\" id=\"orient-west\" title=\"West ←\" aria-pressed=\"false\">←</button>
          </div>
          <label style=\"font-size:12px;margin:6px 0 2px;\">Block Color</label>
          <input type=\"color\" id=\"block-color\" value=\"#8888ff\" style=\"height:32px;\">
          <label style=\"display:none;\">Block Type</label>
          <select id=\"block-type\" class=\"asset-type-select\" style=\"display:none;\">
            <option value=\"full\">Full Block</option>  
            <option value=\"half\" selected>Half Block</option>
            <option value=\"stair\">Stair Block</option>
          </select>
          <label style=\"display:none;\">Block Orientation</label>
          <select id=\"block-orientation\" class=\"asset-type-select\" style=\"display:none;\">
            <option value=\"north\" selected>North</option>
            <option value=\"south\">South</option>
            <option value=\"east\">East</option>
            <option value=\"west\">West</option>
          </select>
        </div>
        <div class=\"fill-settings\">
          <label>
            <input type=\"checkbox\" id=\"fill-mode\"> Enable Fill Mode
          </label>
          <div id=\"fill-controls\" style=\"display: none;\">
            <div class=\"fill-dimension\">
              <label>Width (X):</label>
              <input type=\"number\" id=\"fill-width\" value=\"1\" min=\"1\" max=\"32\">
            </div>
            <div class=\"fill-dimension\">
              <label>Height (Y):</label>
              <input type=\"number\" id=\"fill-height\" value=\"1\" min=\"1\" max=\"32\">
            </div>
            <div class=\"fill-dimension\">
              <label>Depth (Z):</label>
              <input type=\"number\" id=\"fill-depth\" value=\"1\" min=\"1\" max=\"32\">
            </div>
          </div>
        </div>
      </div>

      <div class=\"section-header\">
        <h3>Asset Library</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <input type=\"file\" id=\"model-input\" accept=\".gltf,.glb\" style=\"display: none;\">
        <button class=\"tool-button\" id=\"load-model\" onclick=\"document.getElementById('model-input').click()\">Upload 3D Model</button>
        <input type=\"file\" id=\"texture-input\" accept=\"image/*\" style=\"display: none;\">
        <button class=\"tool-button\" id=\"load-texture\">Upload Texture</button>
        <div id=\"asset-list\"></div>
      </div>

      <div class=\"section-header\">
        <h3>Textures</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"textures-list\"></div>
        <input type=\"file\" id=\"texture-input\" accept=\"image/*\" style=\"display: none;\">
        <button class=\"tool-button\" id=\"load-texture\">Upload Texture</button>
        <button class=\"tool-button\" id=\"generate-texture\">Generate Texture</button>
        <button class=\"tool-button\" id=\"remove-texture\">Remove Texture</button>
      </div>

      <div class=\"section-header\">
        <h3>World Settings</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div class=\"world-settings\">
          <p>Configure the size of the world grid. Large worlds may cause performance issues.</p>
          <div class=\"world-dimension\">
            <label>World Width:</label>
            <input type=\"number\" id=\"world-width\" value=\"32\" min=\"1\" max=\"1024\" step=\"1\">
          </div>
          <div class=\"world-dimension\">
            <label>World Height:</label>
            <input type=\"number\" id=\"world-height\" value=\"32\" min=\"1\" max=\"1024\" step=\"1\">
          </div>
          <div class=\"world-size-info\">
            <span id=\"world-size-display\">Current: 32 × 32 (1,024 cells)</span>
          </div>
          <div class=\"world-size-warning\" id=\"world-size-warning\" style=\"display: none;\">
            <strong>⚠️ Warning:</strong> Large worlds may cause performance issues and stability problems.
          </div>
          <button class=\"tool-button\" id=\"apply-world-size\">Apply World Size</button>
        </div>
      </div>

      <div class=\"section-header\">
        <h3>Background Settings</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"background-settings\">
          <p>Upload a 360° background texture for the scene. Supports HDR, EXR, and standard image formats.</p>
          <input type=\"file\" id=\"background-input\" accept=\"image/*,.hdr,.exr\" style=\"display: none;\">
          <button class=\"tool-button\" id=\"upload-background\">Upload Background</button>
          <button class=\"tool-button\" id=\"remove-background\">Remove Background</button>
          <div id=\"current-background-info\">No background set</div>
        </div>
      </div>

      <div class=\"section-header\">
        <h3>Lighting Settings</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div class=\"lighting-settings\">
          <div class=\"lighting-control\">
            <label>Ambient Light Intensity:</label>
            <input type=\"range\" id=\"ambient-intensity\" min=\"0\" max=\"1\" step=\"0.1\" value=\"0.6\">
            <span id=\"ambient-value\">0.6</span>
          </div>
          <div class=\"lighting-control\">
            <label>Directional Light Intensity:</label>
            <input type=\"range\" id=\"directional-intensity\" min=\"0\" max=\"2\" step=\"0.1\" value=\"0.8\">
            <span id=\"directional-value\">0.8</span>
          </div>
            <div class=\"lighting-control\">
              <label>Shadow Quality:</label>
              <select id=\"shadow-quality\">
                <option value=\"512\">Low (512)</option>
                <option value=\"1024\">Medium (1024)</option>
                <option value=\"2048\" selected>High (2048)</option>
                <option value=\"4096\">Ultra (4096)</option>
              </select>
            </div>
            <div class=\"lighting-control\">
              <label>Shadow Distance:</label>
              <input type=\"range\" id=\"shadow-distance\" min=\"10\" max=\"100\" step=\"5\" value=\"50\">
              <span id=\"shadow-distance-value\">50</span>
            </div>
            <div class=\"lighting-control\">
              <label><input type=\"checkbox\" id=\"enable-shadows\" checked> Enable Shadows</label>
            </div>
            <div class=\"lighting-control\">
              <label>Light Position:</label>
              <div class=\"light-position-controls\">
                <div class=\"axis-control\">
                  <span>X:</span>
                  <input type=\"range\" id=\"light-x\" min=\"-50\" max=\"50\" step=\"1\" value=\"20\">
                  <span id=\"light-x-value\">20</span>
                </div>
                <div class=\"axis-control\">
                  <span>Y:</span>
                  <input type=\"range\" id=\"light-y\" min=\"5\" max=\"80\" step=\"1\" value=\"40\">
                  <span id=\"light-y-value\">40</span>
                </div>
                <div class=\"axis-control\">
                  <span>Z:</span>
                  <input type=\"range\" id=\"light-z\" min=\"-50\" max=\"50\" step=\"1\" value=\"20\">
                  <span id=\"light-z-value\">20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class=\"section-header\">
        <h3>Ground Settings</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"ground-settings\">
          <p>Use the Select Tool (S) to select ground cells, then apply a texture from the library above.</p>
          <div id=\"ground-selection-info\">No ground cells selected.</div>
          <button class=\"tool-button\" id=\"remove-ground-texture\">Remove Custom Texture</button>
        </div>
      </div>

      <div class=\"section-header\">
        <h3>Mobile Inputs</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div class=\"mobile-inputs\">
          <div class=\"mobile-setting\">
            <label><input type=\"checkbox\" id=\"mobile-tap-to-place\" checked> Tap to Place Blocks</label>
          </div>
          <div class=\"mobile-setting\">
            <label><input type=\"checkbox\" id=\"mobile-show-preview\" checked> Show Block Preview</label>
          </div>
          <div class=\"mobile-setting\">
            <label><input type=\"checkbox\" id=\"mobile-vibrate\"> Vibrate on Action</label>
          </div>
          <div class=\"mobile-setting\">
            <button class=\"tool-button\" id=\"mobile-place-blocks\" disabled>Place Selected Blocks</button>
          </div>
          <div class=\"mobile-info\">
            <p>Mobile Controls:</p>
            <ul>
              <li>Tap: Select single block/cell</li>
              <li>Tap & Drag: Select region</li>
              <li>Tap on selection: Place blocks</li>
              <li>Place Button: Place selected blocks</li>
              <li>Pinch: Zoom camera</li>
              <li>Two-finger drag: Rotate camera</li>
            </ul>
          </div>
        </div>
      </div>

      <div class=\"section-header\">
        <h3>Placed Assets</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"placed-assets-list\"></div>
      </div>

      <div class=\"section-header\">
        <h3>Placed Blocks</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"placed-blocks-list\"></div>
      </div>

      <div class=\"section-header\">
        <h3>Action History</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"action-history\"></div>
      </div>
      
      <div class=\"section-header\">
        <h3>Chat & Users</h3>
        <button class=\"section-toggle\">&#x25bc;</button>
      </div>
      <div class=\"section-content expanded\">
        <div id=\"online-users\"></div>
        <div id=\"chat-wrapper\">
          <div id=\"chat-messages\"></div>
          <div id=\"chat-input-container\">
            <input type=\"text\" id=\"chat-input\" placeholder=\"Type message...\">
            <button id=\"chat-send\">💬</button>
            <button id=\"share-world-btn\">📤</button>
          </div>
        </div>
      </div>
  `;


  // Right and bottom toolbars remain empty containers; sections can be dragged into them
  rightToolbar.innerHTML = '';
  bottomToolbar.innerHTML = '';

  // Ensure toggle buttons exist (already in index.html)
  // removed function createToggleButtons() {}

  // Done building layout
})();