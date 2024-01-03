//@ts-nocheck
import Vue from 'vue';

// ------ IMPORT COMPONENTS
// Modals
import Modal from './modals/Modal.vue';
import NewKeepModal from './modals/NewKeepModal.vue';
import UserModal from './modals/UserModal.vue';
import VaultModal from './modals/VaultModal.vue';
// Components
import ClickEdit from './components/ClickEdit.vue';
import Keep from './components/Keep.vue';
import KeepCount from './components/KeepCount.vue';
import KeepInfo from './components/KeepInfo.vue';
import KeepOptions from './components/KeepOptions.vue';
import Keeps from './components/Keeps.vue';
import KeepsColumn from './components/KeepsColumn.vue';
import KeepsContainer from './components/KeepsContainer.vue';
import KeepTagsButton from './components/KeepTagsButton.vue';
import KeepViewCount from './components/KeepViewCount.vue';
import LoggedInUser from './components/LoggedInUser.vue';
import NavBar from './components/NavBar.vue';
import SaveKeep from './components/SaveKeep.vue';
import SlideOut from './components/SlideOut.vue';
import UserIcon from './components/UserIcon.vue';
import UserKeeps from './components/UserKeeps.vue';
import Vault from './components/Vault.vue';
import VaultListItem from './components/VaultListItem.vue';
import Vaults from './components/Vaults.vue';

import { Stack, StackItem } from 'vue-stack-grid';
// Views

// ------ REGISTER COMPONENTS
// Modals
Vue.component('modal', Modal);
Vue.component('new-keep-modal', NewKeepModal);
Vue.component('user-modal', UserModal);
Vue.component('vault-modal', VaultModal);
// Components
Vue.component('click-edit', ClickEdit);
Vue.component('keep', Keep);
Vue.component('keep-count', KeepCount);
Vue.component('keep-info', KeepInfo);
Vue.component('keep-options', KeepOptions);
Vue.component('keeps', Keeps);
Vue.component('keeps-column', KeepsColumn);
Vue.component('keeps-container', KeepsContainer);
Vue.component('keep-tags-button', KeepTagsButton);
Vue.component('keep-view-count', KeepViewCount);
Vue.component('logged-in-user', LoggedInUser);
Vue.component('nav-bar', NavBar);
Vue.component('save-keep', SaveKeep);
Vue.component('slide-out', SlideOut);
Vue.component('user-icon', UserIcon);
Vue.component('user-keeps', UserKeeps);
Vue.component('vault', Vault);
Vue.component('vault-list-item', VaultListItem);
Vue.component('vaults', Vaults);

Vue.component('stack', Stack);
Vue.component('stack-item', StackItem);


