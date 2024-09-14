<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <nav>
            <ol class="footer-links">
              <li class="footer-link">
                <a title="GitHub" href="https://github.com/JoramMillenaar" target="_blank" rel="noopener">
                  <img loading="lazy" src="../assets/svgs/github.svg" alt="GitHub"/>
                </a>
              </li>
              <li class="footer-link">
                <a title="LinkedIn" href="https://www.linkedin.com/in/joram-millenaar-099406143/" target="_blank" rel="noopener">
                  <img loading="lazy" src="../assets/svgs/linkedin.svg" alt="LinkedIn"/>
                </a>
              </li>
              <!-- Additional links can be added here -->
            </ol>
          </nav>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'SiteFooter'
  }
  </script>
  
  <style scoped>
  .footer {
    padding: var(--gutter-large) 0;
    border-top: 1px solid var(--border);
    text-align: center;
  }
  
  .footer-links {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: var(--gutter-small);
  }
  
  .footer-link a {
    display: inline-block;
    transition: opacity 0.3s ease;
  }
  
  .footer-link a:hover {
    opacity: 0.8;
  }
  
  .footer-link img {
    width: 24px;
  }
  </style>
  