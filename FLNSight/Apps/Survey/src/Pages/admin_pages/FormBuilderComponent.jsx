import React, { useEffect, useRef, useState } from "react";

const FormBuilderComponent = () => {
  const builderRef = useRef(null);
  const [formBuilder, setFormBuilder] = useState(null);

  useEffect(() => {
    // Dynamically add Bootstrap CSS
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapLink);

    // Dynamically add Bootstrap Icons CSS
    const bootstrapIconsLink = document.createElement("link");
    bootstrapIconsLink.rel = "stylesheet";
    bootstrapIconsLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
    document.head.appendChild(bootstrapIconsLink);

    // Dynamically add Form.io script
    const formioScript = document.createElement("script");
    formioScript.src = "https://cdn.form.io/js/formio.full.min.js";
    formioScript.onload = () => {
      initializeFormBuilder();
    };
    document.body.appendChild(formioScript);
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapScript);

    const style = document.createElement("style");
    style.textContent = `
  /* Modal dialog adjustments */
  .formio-dialog {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 1050 !important; /* Ensure modal is above overlay */
    display: block !important;
    max-height: 90vh !important; /* Restrict height to 90% of the viewport */
    width: 90vw !important; /* Make modal responsive to width */
    overflow: hidden !important; /* Hide overflowing content */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #eee;
  }

  /* Scrollable content inside modal */
  .formio-dialog-content {
    max-height: 70vh !important; /* Content area restricted to 70% of viewport height */
    overflow-y: auto !important; /* Enable vertical scrolling */
    padding: 10px;
  }

  /* Hide the internal overlay inside the modal */
  .formio-dialog .formio-dialog-overlay {
    display: none !important; /* Completely hide Form.io's internal overlay */
  }
`;
    document.head.appendChild(style);

    // Cleanup dynamically added CSS and script
    return () => {
      document.head.removeChild(bootstrapLink);
      document.head.removeChild(bootstrapIconsLink);
      document.body.removeChild(formioScript);
    };
  }, []);

  const initializeFormBuilder = async () => {
    const components = await fetchFormFields();
    createCustomComponents();

    try {
      const builder = await window.Formio.builder(
        builderRef.current,
        {
          components: components,
        },
        {
          noProject: true, // Local usage without project ID
        }
      );

      setFormBuilder(builder);

      // Apply hover effects dynamically after each render
      applyHoverEffects(builder);

      builder.on("render", () => {
        applyHoverEffects(builder); // Re-bind hover logic after DOM updates
      });
    } catch (error) {
      console.error("Error initializing Form.io builder:", error);
    }
  };

  const fetchFormFields = async () => {
    // Default form fields
    return [
      {
        type: "textfield",
        key: "firstName",
        label: "First Name",
        input: true,
      },
      {
        type: "textfield",
        key: "lastName",
        label: "Last Name",
        input: true,
      },
      {
        type: "email",
        key: "email",
        label: "Email Address",
        input: true,
        validate: {
          required: true,
        },
      },
    ];
  };

  const createCustomComponents = () => {
    console.log("Custom components created.");
  };

  // Function to dynamically apply hover effects
  const applyHoverEffects = () => {
    const components = document.querySelectorAll(".formio-component");

    components.forEach((component) => {
      // Find the button group BEFORE the component
      const btnGroup = component.previousElementSibling;

      if (btnGroup && btnGroup.classList.contains("component-btn-group")) {
        // Set styles to hide buttons initially
        btnGroup.style.display = "none"; // Hide buttons initially
        btnGroup.style.marginLeft = "10px"; // Add some spacing to the left

        // Show buttons on hover
        component.addEventListener("mouseenter", () => {
          btnGroup.style.display = "inline-flex"; // Show as inline-flex for alignment
        });

        component.addEventListener("mouseleave", (e) => {
          // Check if mouse leaves both component and button group
          setTimeout(() => {
            if (
              !component.matches(":hover") && // Mouse not hovering on component
              !btnGroup.matches(":hover") // Mouse not hovering on buttons
            ) {
              btnGroup.style.display = "none"; // Hide buttons
            }
          }, 200); // Add delay to prevent flickering
        });

        // Handle hover events on the button group itself to prevent flickering
        btnGroup.addEventListener("mouseenter", () => {
          btnGroup.style.display = "inline-flex"; // Keep visible when hovering on buttons
        });

        btnGroup.addEventListener("mouseleave", () => {
          btnGroup.style.display = "none"; // Hide when leaving button group
        });
      }
    });
  };

  return (
    <div
      className="container-fluid p-3"
      style={{
        height: "100vh",
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        ref={builderRef}
        id="builder"
        style={{
          height: "100%",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "8px",
        }}
      ></div>
    </div>
  );
};

export default FormBuilderComponent;
