<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>
    <div class="demo">
      <h6>basic</h6>
      <ux-steps current="1"
                :theme="theme">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="进行中"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>small</h6>
      <ux-steps current="1"
                size="small"
                :theme="theme">
        <ux-step title="已完成"
                 :desc="description">
          <span slot="title"
                style="color:red">
            已完成!!
          </span>
        </ux-step>
        <ux-step title="进行中">
          <span slot="desc"
                style="color: green">
            {{description}}
          </span>
        </ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>icon</h6>
      <ux-steps current="1"
                status="error"
                :theme="theme">
        <ux-step title="User"
                 icon="user"
                 :desc="description">
          <i slot="icon"
             class="fu fu-account"></i>
        </ux-step>
        <ux-step title="Edit"
                 icon="edit"
                 :desc="description">
        </ux-step>
        <ux-step title="Detail"
                 icon="detail"
                 :desc="description"></ux-step>
        <ux-step title="Save"
                 icon="save"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>icon</h6>
      <ux-steps current="2"
                :theme="theme"
                status="process">
        <ux-step title="User"
                 icon="user"
                 :desc="description">
          <i slot="icon"
             class="fu fu-account"></i>
        </ux-step>
        <ux-step title="Edit"
                 icon="edit"
                 :desc="description">
        </ux-step>
        <ux-step title="Detail"
                 icon="detail"
                 :desc="description"></ux-step>
        <ux-step title="Save"
                 icon="save"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>
    <div class="demo">
      <h6>step change</h6>
      <ux-steps :current="current"
                :theme="theme">
        <ux-step title="Login"
                 v-for="(step,i) in steps"
                 :key="i"
                 :title="step.title">
        </ux-step>
      </ux-steps>
      <div class="demo-body">
        {{currentStep.title}}
      </div>
      <button class="ux-btn"
              @click="prev">上一步</button>
      <button class="ux-btn"
              @click="next">下一步</button>
    </div>

    <div class="demo">
      <h6>vertical</h6>
      <ux-steps current="1"
                :theme="theme"
                direction="vertical">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="进行中"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>small vertical</h6>
      <ux-steps current="1"
                size="small"
                :theme="theme"
                direction="vertical">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="进行中"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>error</h6>
      <ux-steps current="1"
                :theme="theme"
                status="error">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="进行中"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>dot</h6>
      <ux-steps current="1"
                :theme="theme"
                progress-dot
                status="error">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="错误"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <!-- <div class="demo">
      <h6>dot popover</h6>
      <ux-steps current="1"
                progress-dot
                status="error">
        <ux-step title="已完成"
                 :desc="description">
          <template slot-scope="props"
                    slot="icon">
            <ux-popover content="这是一个step popover">
              <span :class="props.class"
                    class="ux-steps-icon-dot"></span>
            </ux-popover>
          </template>
        </ux-step>
        <ux-step title="进行中"
                 :desc="description">
          <template slot-scope="props"
                    slot="icon">
            <ux-popover content="这是一个step popover">
              <span :class="props.class"
                    class="ux-steps-icon-dot"></span>
            </ux-popover>
          </template>
        </ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div> -->

    <div class="demo">
      <h6>error dark</h6>
      <ux-steps current="1"
                :theme="theme"
                status="error"
                direction="vertical">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="错误"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>
    <div class="demo">
      <h6>wait dark</h6>
      <ux-steps current="0"
                :theme="theme"
                status="process">
        <ux-step title="运行中"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>process dark</h6>
      <ux-steps current="2"
                :theme="theme"
                size="small"
                status="finish">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="process"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>process dot dark</h6>
      <ux-steps current="1"
                :theme="theme"
                progress-dot
                status="process"
                direction="vertical">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="process"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>process dot dark</h6>
      <ux-steps current="1"
                :theme="theme"
                progress-dot
                status="error">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="process"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>

    <div class="demo">
      <h6>process dot dark</h6>
      <ux-steps current="2"
                :theme="theme"
                progress-dot
                status="finish">
        <ux-step title="已完成"
                 :desc="description"></ux-step>
        <ux-step title="process"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
        <ux-step title="待运行"
                 :desc="description"></ux-step>
      </ux-steps>
    </div>
  </div>
</template>


<script>
  import '../../../src/components/steps/style/index.scss';
  import UxPopover from '../../../src/components/popover';
  import { UxSteps, UxStep } from '../../../src/components/steps';

  export default {
    data() {
      return {
        description: '这是描述',
        current: 1,
        currentStep: null,
        steps: [],
        theme: 'light',
      };
    },
    created() {
      this.steps = Array(4)
        .fill(0)
        .map((v, i) => ({ title: `步骤${i + 1}` }));
      this.currentStep = this.steps[this.current];
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      prev() {
        const { current, steps } = this;
        const step = current - 1;
        this.current = step < 0 ? steps.length + step : step;
        this.currentStep = steps[this.current];
      },
      next() {
        const { current, steps } = this;
        this.current = (current + 1) % steps.length;
        this.currentStep = steps[this.current];
      },
    },
    components: {
      UxSteps,
      UxStep,
      UxPopover,
    },
  };
</script>

<style lange="scss" scoped>
  h6 {
    margin-bottom: 20px;
  }
  .demo-body {
    width: 100%;
    height: 200px;
    background: #eee;
    margin: 20px 0 10px;
    text-align: center;
  }
</style>
