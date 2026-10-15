/* Общая роль и подсветка активного пункта меню для всех страниц сайта. */
(function () {
  var ROLE_KEY = 'rsvRole';
  var ROLE_LABELS = { expert: 'Эксперт', customer: 'Заказчик', curator: 'Куратор' };
  var VALID_ROLES = Object.keys(ROLE_LABELS);

  function getRole() {
    try {
      var saved = localStorage.getItem(ROLE_KEY);
      if (VALID_ROLES.indexOf(saved) !== -1) return saved;
    } catch (_) {}
    return 'expert';
  }

  function setRole(role, announce) {
    if (VALID_ROLES.indexOf(role) === -1) role = 'expert';
    try { localStorage.setItem(ROLE_KEY, role); } catch (_) {}
    document.dispatchEvent(new CustomEvent('rsv:role-change', { detail: { role: role, announce: !!announce } }));
  }

  function initTopbar(activePage) {
    document.querySelectorAll('.site-nav [data-site-link]').forEach(function (a) {
      a.classList.toggle('active', a.dataset.siteLink === activePage);
    });
    var select = document.getElementById('globalRoleSelect');
    if (select) {
      select.value = getRole();
      select.addEventListener('change', function (e) { setRole(e.target.value, true); });
    }
  }

  window.RSVNav = { getRole: getRole, setRole: setRole, initTopbar: initTopbar, ROLE_LABELS: ROLE_LABELS };
})();
