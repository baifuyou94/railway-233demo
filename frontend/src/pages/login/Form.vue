<script setup lang="ts">
import { ref, reactive } from "vue";
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { useUserStore, useCommomStore } from '@/models';


const userStore = useUserStore();
const commomStore = useCommomStore();
const router = useRouter();


const rules = {
    loginName: [{ required: true, trigger: "blur", message: "请输入账号" }],
    password: [{ required: true, trigger: "blur", message: "请输入密码" }],
};
const formModel = reactive({
    loginName: "",
    password: "",
});

const loading = ref(false);

const handleFinish = async (values: any) => {
    if(!values){ return  false}
    try {
        // 验证登陆
        loading.value = true;
        const userInfo = await userStore.login({
            password: values.password,
            loginName: values.loginName,
        });

        if (userInfo) {
            await router.replace("/");
            localStorage.setItem("userId", userInfo.id);
            commomStore.init();
        }
        
        loading.value = false;
    } catch (error) {
        loading.value = false;
        message.error(String(error) || '登录失败！');
        console.log(error);
    }
    
    
};
</script>
<template>
    <div class="form_box">
        <a-form :model="formModel" :rules="rules" @finish="handleFinish">
            <p class="text">请输入账号</p>
            <a-form-item name="loginName">
                <a-input
                    class="reset-input"
                    v-model:value="formModel.loginName"
                    placeholder=""
                >
                </a-input>
            </a-form-item>
            <p class="text">请输入密码</p>
            <a-form-item name="password">
                <a-input
                    class="reset-input"
                    v-model:value="formModel.password"
                    type="password"
                    placeholder=""
                >
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-button html-type="submit" class="btn" :loading="loading">立即登录</a-button>
            </a-form-item>
        </a-form>
        <p class="copyright"></p>
    </div>
</template>


<style lang="less" scoped>
.form_box {
    margin-top: 30px;
    .btn {
        width: 100%;
        height: 54px;
        background: linear-gradient(90deg, #00c3fd 0%, #3662f4 100%);
        border-radius: 6px;
        color: #ffffff;
        font-size: 20px;
        &:hover {
            opacity: 0.85;
            border: none;
        }
    }
    .icon {
        color: #666666;
    }
    .text {
        font-size: 14px;
        line-height: 20px;
        color: #999999;
        letter-spacing: 1.1px;
        margin-bottom: 10px;
    }
    .gray_text {
        font-size: 12px;
        color: #666666;
    }
    .reset_checkbox {
        .ant-checkbox-inner {
            border-radius: 50%;
        }
        & > span:last-child {
            font-size: 12px;
            color: #666666;
        }
    }
    .reset-input {
        height: 50px;
        line-height: 50px;
        border: 1px solid #707070;
        border-radius: 6px;
    }
    .copyright {
        margin-top: 20px;
        font-size: 12px;
        color: #999999;
        opacity: 0.85;
    }
}
</style>
