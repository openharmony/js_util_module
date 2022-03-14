/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
#include <cstring>
#include <sys/sysinfo.h>
#include <unistd.h>

#include "napi/native_api.h"
#include "napi/native_node_api.h"
#include "native_engine/native_engine.h"

#ifndef BASE_COMPILERUNTIME_JS_UTIL_MODULE_TYPES_CLASS_H
#define BASE_COMPILERUNTIME_JS_UTIL_MODULE_TYPES_CLASS_H

namespace OHOS::Util {
    class Types {
    public:
        explicit Types(napi_env env);
        virtual ~Types() {}
        napi_value IsAnyArrayBuffer(napi_value src) const;
        napi_value IsArrayBufferView(napi_value src) const;
        napi_value IsArgumentsObject(napi_value src) const;
        napi_value IsArrayBuffer(napi_value src) const;
        napi_value IsAsyncFunction(napi_value src) const;
        napi_value IsBigInt64Array(napi_value src) const;
        napi_value IsBigUint64Array(napi_value src) const;
        napi_value IsBooleanObject(napi_value src) const;
        napi_value IsBoxedPrimitive(napi_value src) const;
        napi_value IsDataView(napi_value src) const;
        napi_value IsDate(napi_value src) const;
        napi_value IsExternal(napi_value src) const;
        napi_value IsFloat32Array(napi_value src) const;
        napi_value IsFloat64Array(napi_value src) const;
        napi_value IsGeneratorFunction(napi_value src) const;
        napi_value IsGeneratorObject(napi_value src) const;
        napi_value IsInt8Array(napi_value src) const;
        napi_value IsInt16Array(napi_value src) const;
        napi_value IsInt32Array(napi_value src) const;
        napi_value IsMap(napi_value src) const;
        napi_value IsMapIterator(napi_value src) const;
        napi_value IsModuleNamespaceObject(napi_value src) const;
        napi_value IsNativeError(napi_value src) const;
        napi_value IsNumberObject(napi_value src) const;
        napi_value IsPromise(napi_value src) const;
        napi_value IsProxy(napi_value src) const;
        napi_value IsRegExp(napi_value src) const;
        napi_value IsSet(napi_value src) const;
        napi_value IsSetIterator(napi_value src) const;
        napi_value IsSharedArrayBuffer(napi_value src) const;
        napi_value IsStringObject(napi_value src) const;
        napi_value IsSymbolObject(napi_value src) const;
        napi_value IsTypedArray(napi_value src) const;
        napi_value IsUint8Array(napi_value src) const;
        napi_value IsUint8ClampedArray(napi_value src) const;
        napi_value IsUint16Array(napi_value src) const;
        napi_value IsUint32Array(napi_value src) const;
        napi_value IsWeakMap(napi_value src) const;
        napi_value IsWeakSet(napi_value src) const;
    private:
        napi_env env_;
    };
}
#endif