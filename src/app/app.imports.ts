import { AccordionListComponent } from './../components/accordion-list/accordion-list';

// Global state (used for theming)
import { AppState } from './app.global';

// Providers
import { ToastService } from '../providers/util/toast.service';
import { AlertService } from '../providers/util/alert.service';
import { CameraProvider } from '../providers/util/camera.provider';


// Directives
import { SlidingDrawer } from '../components/sliding-drawer/sliding-drawer';
import { Autosize } from '../components/autosize/autosize';

// Components
import { Timer } from '../components/countdown-timer/timer';
import { TimerProgress } from '../components/timer-progress/timer-progress';
import { ExpandableHeader } from '../components/expandable-header/expandable-header';
import { FlashCardComponent } from '../components/flash-card/flash-card';

export const PROVIDERS = [
  AlertService,
  ToastService,
  AppState,
  CameraProvider,
];

export const COMPONENTS = [
  FlashCardComponent,
  TimerProgress,
  Timer,
  ExpandableHeader,
  Autosize,
  AccordionListComponent,
];

export const DIRECTIVES = [
  SlidingDrawer,
  Timer,
  Autosize,
];
