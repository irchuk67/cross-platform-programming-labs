#include <node.h>

namespace calculate {
    using v8::Exception;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::Number;
    using v8::String;
    using v8::Value;

    void Method(const FunctionCallbackInfo<Value>&args){
        Isolate* isolate = args.GetIsolate();

        int i;
        double x = 100.2561375261536, y = 200.7321878371236981;

        for(i = 0; i < 1000000000; i++){
            x += y;
        }

        auto total = Number::New(isolate, x);


        printf("%d", args[0]);
        args.GetReturnValue().Set(total);
    }

    //function to add 2 numbers or concat 2 strings
    void Add(const FunctionCallbackInfo<Value>&args){
        Isolate* isolate = args.GetIsolate();

       if (args.Length() < 2) {
           // Throw an Error that is passed back to JavaScript
           isolate->ThrowException(Exception::TypeError(
               String::NewFromUtf8(isolate,
                                   "Not enough arguments").ToLocalChecked()));
           return;
       }

       if(args[0]->IsNumber() && args[1]->IsNumber()){
            double value = args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
            Local<Number> num = Number::New(isolate, value);
            args.GetReturnValue().Set(num);
       }else if(args[0]->IsString() && args[1]->IsString()){
            String::Utf8Value str1(isolate, args[0]);
            String::Utf8Value str2(isolate, args[1]);
            std::string word1(*str1);
            std::string word2(*str2);

            std::string res = word1 + word2;
            auto result = String::NewFromUtf8(isolate, res.c_str()).ToLocalChecked();
            args.GetReturnValue().Set(result);
        }

    }

    void Multiply(const FunctionCallbackInfo<Value>&args){
        Isolate* isolate = args.GetIsolate();

        if (args.Length() < 2) {
           isolate->ThrowException(Exception::TypeError(
               String::NewFromUtf8(isolate, "Not enough arguments").ToLocalChecked()));
           return;
        }

        if(!args[0]->IsNumber() && !args[1]->IsNumber()){
           isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate, "Incorrect arguments").ToLocalChecked()));
           return;
        }

        double value = args[0].As<Number>()->Value() * args[1].As<Number>()->Value();
         Local<Number> num = Number::New(isolate, value);
         args.GetReturnValue().Set(num);
    }


  void Subtract(const FunctionCallbackInfo<Value>&args){
        Isolate* isolate = args.GetIsolate();

        if (args.Length() < 2) {
           isolate->ThrowException(Exception::TypeError(
               String::NewFromUtf8(isolate, "Not enough arguments").ToLocalChecked()));
           return;
        }

        if(!args[0]->IsNumber() && !args[1]->IsNumber()){
           isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate, "Incorrect arguments").ToLocalChecked()));
           return;
        }

        double value = args[0].As<Number>()->Value() - args[1].As<Number>()->Value();
         Local<Number> num = Number::New(isolate, value);
         args.GetReturnValue().Set(num);
    }

  void Divide(const FunctionCallbackInfo<Value>&args){
        Isolate* isolate = args.GetIsolate();

        if (args.Length() < 2) {
           isolate->ThrowException(Exception::TypeError(
               String::NewFromUtf8(isolate, "Not enough arguments").ToLocalChecked()));
           return;
        }

        if(!args[0]->IsNumber() && !args[1]->IsNumber()){
           isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate, "Incorrect arguments").ToLocalChecked()));
           return;
        }

        double value = args[0].As<Number>()->Value() / args[1].As<Number>()->Value();
         Local<Number> num = Number::New(isolate, value);
         args.GetReturnValue().Set(num);
    }

    void PrintGreeting(const FunctionCallbackInfo<Value>&args){
        Isolate* isolate = args.GetIsolate();
        if (args.Length() < 1) {
           isolate->ThrowException(Exception::TypeError(
               String::NewFromUtf8(isolate, "Incorrect amount of arguments").ToLocalChecked()));
           return;
        }

        if(!args[0]->IsString()){
           isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate, "Incorrect argument").ToLocalChecked()));
           return;
        }
        String::Utf8Value str1(isolate, args[0]);
        std::string word1(*str1);

        std::string result = "Hello, " + word1;
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, result.c_str()).ToLocalChecked());
    }


    void Initialize(Local<Object> exports){
        NODE_SET_METHOD(exports, "add", Add);
        NODE_SET_METHOD(exports, "multiply", Multiply);
        NODE_SET_METHOD(exports, "subtract", Subtract);
        NODE_SET_METHOD(exports, "divide", Subtract);

        NODE_SET_METHOD(exports, "greeting", PrintGreeting);

    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
}

/*
add(auto var1, auto var2){
    if(var1.getType() === "Integer" && var2)
    auto
}
*/